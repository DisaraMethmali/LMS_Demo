from app import create_app, db

app = create_app()

if __name__ == '_main_':
    with app.app_context():
        db.create_all()
    app.run(debug=True)