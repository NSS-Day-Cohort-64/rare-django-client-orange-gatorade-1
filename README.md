# Rare: The Publishing Platform for the Discerning Writer
Rare media is an intuitive and user friendly publishing platform where authors can make a name for themselves as independent journalists and bloggers. Once registered, a user has the ability to build their own following by publishing unique posts, as well as the ability to subscribe to their favorite trending authors. Authors can manage their own posts by updating or deleting them altogether, and they can keep up with their audience's opinions of their work by seeing what reactions have been left on their entries. Each post can have multiple tags to help users find posts that cater to their interests, and users can also find posts via a robust search bar and filtering system that allows many filter queries to be stacked together.

For styling, the team implemented libraries from the [Bulma](https://bulma.io/documentation) framework to keep the user interface consistent, minimalist, and uniform.

## Installations and Getting Started
 1. Install dependencies for React in the rare-client directory: 
 
    ```bash 
    npm install 
    ```

 2. Next, pull down the repository for the server

    ```bash
    git clone git@github.com:NSS-Day-Cohort-64/rare-django-server-orange-gatorade.git
    ```
3. In the project directory for the rare-server, install the dependencies by running these commands:

   ```bash
   pipenv shell
   ```
   Once you have confirmed that the virtual environment for the project is running, enter this command:

   ```bash
   pipenv install
   ```

4. After you have installed the dependencies and are running your virtual environment, in the directory for rare-server, run this command to load your database with some starter data:

   ```bash
   ./seed_database.sh
   ```

5. To start up the server, in the rare-server directory, run this command:

    ```bash
    python3 manage.py runserver
    ```
6. Now you can start up the client as well by running the code `npm start`:

    ```bash
    npm start
    ```
    
6. You should now be able to register an account and browse the rare-publishing app! If you want to browse as an admin to see admin privileges, you can sign in with the following credentials:

    - **username**: megducharme
    - **password**: ducharme

   ### Need help getting set up?
   Feel free to reach out to us!
    - [Belle](https://github.com/bellehollander)
    - [Lance](https://github.com/LanceBuckley)
    - [Ryan](https://github.com/ryanmphill)



## Contributing

Primary contributors for Rare-Publishing are [Belle](https://github.com/bellehollander), [Lance](https://github.com/LanceBuckley), and [Ryan](https://github.com/ryanmphill). If you have any suggestions or ideas you would like to see implemented, or if you find any bugs, please open an issue first or contact us
so that we can discuss what you would like to see changed.