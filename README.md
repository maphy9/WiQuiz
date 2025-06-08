## Prerequisites
- [ ] bun (version 1.2.10 or newer)
- [ ] python (version 3.13 or newer)
- [ ] pip (version 24.3.1 or newer)


## Configuring backend
Enter the WiQuiz/backend directory.

Then run the following command: ```python -m venv .venv```

This will create a virtual enviroment for python

Activate virtual environment using the following:
- Windows: ```. .venv/Scripts/activate```
- Unix: ```. .venv/bin/activate```

Then install all the dependencies: ```pip install -r requirements.txt```

Delete db/kck.db file if exists and run ```python fill_database.py```

Finally, you can run the backend locally: ```uvicorn main:app --reload```


## Configuring frontend
Enter the WiQuiz/frontend directory.

Then run the following command: ```bun install```

After that you should create a .env file

Copy what's inside .env_example into .env

Now you can run the frontend locally using ```bun dev```


### Now you have the app working locally on your machine. You can also run the app on your local network


## How to run the app on my local network?
First, you need to know what is the ip address of the machine you want to run your backend on

Enter the WiQuiz/frontend directory

Change VITE_IP in .env from ```localhost``` to your ip address

To run the frontend on your local network use ```bun dev --host```

Enter WiQuiz/backend directory and run the backend using ```uvicorn main:app --host 0.0.0.0 --port 8000```
