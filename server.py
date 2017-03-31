"""Carbon Calculator App"""

from jinja2 import StrictUndefined
from flask import (Flask, render_template, redirect, request, flash,
                   session, jsonify)
from flask_debugtoolbar import DebugToolbarExtension
from model import (connect_to_db, db, User, Residence, ElectricityLog, NGLog,
                   UserCar, Car, TripLog)
from sqlalchemy.orm.exc import NoResultFound

app = Flask(__name__)

app.secret_key = "ABC"  # Required to use Flask sessions and the debug toolbar
app.jinja_env.undefined = StrictUndefined  # Undefined variable in Jinja2 will raise an error.

###  Users, Login, Signup, Logout #############################################


@app.route("/", methods=["GET"])
def login():
    """Renders login template if the user is not signed in and the homepage if
    the user is logged in."""

    if session.get("user_id"):
        return render_template("homepage.html")
    else:
        return render_template("login-register.html")


@app.route("/process-login", methods=["POST"])
def login_process():
    """Logs a user in with their email and password."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = User.query.filter_by(email=email).first()

    # If user exists and password is correct, render homepage
    if user and (user.password == password):
        # Add user_id to session cookie
        session["user_id"] = user.user_id

        flash('You were successfully logged in')
        return render_template("homepage.html")
    # If either email or password incorrect, show message to user.
    else:
        flash("This combination of username and password doesn't exist")


@app.route("/process-signup", methods=["POST"])
def register_process():
    """Takes in four inputs via POST request and returns redirect to hompage.
    Adds new user to the database if they don't exist."""

    email = request.form.get("email")
    password = request.form.get("password")
    name = request.form.get("name")

    if (User.query.filter_by(email=email).all()) == []:
        new_user = User(email=email, password=password, name=name)

        db.session.add(new_user)
        db.session.commit()

        # Add user_id to session cookie
        user = User.query.filter_by(email=email).first()
        session["user_id"] = user.user_id

    else:
        flash("This user already exists. Please log in.")
        return redirect("/")

    return redirect("/")


@app.route("/logout", methods=["POST"])
def logout_process():
    """Logs out users and redirects to homepage."""

    del session["user_id"]
    flash('You were successfully logged out')
    return redirect("/")


###  User Profile #############################################################


@app.route("/profile", methods=["GET"])
def view_profile():
    """User profile page"""

    user_id = session.get("user_id")
    name = User.query.get(user_id).name

    if user_id:
        residences = Residence.query.filter_by(user_id=user_id).all()
        usercars = UserCar.query.filter_by(user_id=user_id).all()

        return render_template("profile.html", residences=residences, name=name,
                               usercars=usercars)

    # return to homepage when not logged in
    else:
        return redirect("/")


@app.route("/add-residence", methods=["POST"])
def add_residence():
    """Add a residence for a profile"""

    name_or_address = request.form.get("name_or_address")
    zipcode = request.form.get("zipcode")
    number_of_residents = request.form.get("no_residents")
    user_id = session.get("user_id")
    is_default = request.form.get("default")

    if is_default is None:
        is_default = False

    Residence.create(user_id, zipcode, name_or_address, is_default,
                     number_of_residents)

    return redirect("/profile")


@app.route("/add-car", methods=["POST"])
def add_car():
    """Add a residence for a profile"""

    make = request.form.get("make")
    model = request.form.get("model")
    year = int(request.form.get("year"))
    is_default = request.form.get("default")
    user_id = session.get("user_id")

    if is_default is None:
        is_default = False
    else:
        is_default = True

    print user_id, make, model, year, is_default, type(is_default)

    UserCar.create(user_id, make, model, year, is_default)

    return redirect("/profile")


###  kWh, NG, Trans Carbon Log ################################################

@app.route("/carbon-log", methods=["GET"])
def view_carbon_log():
    """Carbon data entry page."""

    user_id = session.get("user_id")

    if user_id:

        electricity_logs = ElectricityLog.query.filter(
            ElectricityLog.residence.has(Residence.user_id == user_id)).all()

        ng_logs = NGLog.query.filter(
            ElectricityLog.residence.has(Residence.user_id == user_id)).all()

        trip_logs = TripLog.query.filter_by(user_id=user_id).all()

        residences = Residence.query.filter_by(user_id=user_id).all()

        usercars = UserCar.query.filter_by(user_id=user_id).all()

        return render_template("carbon-log.html",
                               electricity_logs=electricity_logs,
                               residences=residences,
                               ng_logs=ng_logs,
                               trip_logs=trip_logs,
                               usercars=usercars)

    # return to homepage when not logged in
    else:
        return redirect("/")


@app.route("/add-kwh", methods=["POST"])
def add_kwh():
    """User kwh data for the user."""

    start_date = request.form.get("start_date")
    end_date = request.form.get("end_date")
    kwh = request.form.get("kwh")
    name_or_address = request.form.get("residence")
    user_id = session.get("user_id")

    try:
        residence = Residence.query.filter_by(user_id=user_id,
                                              name_or_address=name_or_address).one()
    except NoResultFound:  # one error
        residence = Residence.query.filter_by(user_id=user_id,
                                              name_or_address=name_or_address).first()

    residence_id = residence.residence_id

    new_kwh = ElectricityLog(start_date=start_date, end_date=end_date, kwh=kwh,
                             residence_id=residence_id)

    db.session.add(new_kwh)
    db.session.commit()

    return redirect("/carbon-log")


@app.route("/add-ng", methods=["POST"])
def add_ng():
    """Add natural gas data for the user."""

    start_date = request.form.get("start_date")
    end_date = request.form.get("end_date")
    therms = request.form.get("therms")
    name_or_address = request.form.get("residence")
    user_id = session.get("user_id")

    residence = Residence.query.filter_by(user_id=user_id,
                                          name_or_address=name_or_address).one()

    residence_id = residence.residence_id

    new_therms = NGLog(start_date=start_date, end_date=end_date,
                       therms=therms, residence_id=residence_id)

    db.session.add(new_therms)
    db.session.commit()

    return redirect("/carbon-log")


@app.route("/add-trip", methods=["POST"])
def add_trip():
    """Add transportation data for the user."""

    date = request.form.get("date")
    miles = int(request.form.get("miles"))
    car = request.form.get("car").split("|")

    make = car[0]
    model = car[1]
    year = car[2]

    user_id = session.get("user_id")

    car_id = Car.query.filter_by(make=make, model=model, year=year).first().car_id

    TripLog.create(user_id, car_id, date, miles)

    return redirect("/carbon-log")


###  Helper Functions #########################################################

if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    app.jinja_env.auto_reload = app.debug  # make sure templates, etc. are not cached in debug mode

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')
