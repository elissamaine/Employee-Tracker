INSERT INTO departments (dp_name)
VALUES  ("Entertainment"),
        ("Management");

INSERT INTO roles (title, salary, department_id) 
VALUES  ("Juggler", 50000, 1),
        ("Clown", 50000, 1),
        ("Magician", 50000, 1),
        ("Mime", 60000, 1),
        ("Head Juggler", 75000, 2),
        ("Head Clown", 75000, 2),
        ("Head Magician" , 75000, 2),
        ("Head Mime", 80000, 2);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Daisy", "Doo", 5, NULL),
        ("Ron", "Roe", 6 , NULL),
        ("Jane", "Doe", 7, NULL),
        ("Frank", "Oui", 8, NULL),
        ("Bob", "Jones", 1, 1),
        ("Sally", "Smith", 2, 2),
        ("John", "Doe", 3, 3),
        ("Billy", "Boo", 4, 4),
        ("Sue", "Smith", 1, 1),
        ("Joe", "Doe", 2, 2),
        ("Kevin", "June", 3, 3),
        ("Lilly", "Loo", 4, 4);
        
