A.
SELECT e.firts_name, s.salary 
FROM employees e 
INNER JOIN salaries s 
ON e.emp_no = s.emp_no 
ORDER BY s.salary DESC 
LIMIT 1


B:
SELECT d.dept_name, SUM(s.salary) as salario 
FROM employees e 
INNER JOIN salaries s 
ON e.emp_no=s.emp_no 
INNER JOIN dept_emp de 
ON de.emp_no=e.emp_no 
LEFT JOIN departments d 
ON d.dept_no = de.dept_no 
GROUP BY d.dept_no

C.

SELECT e.*, (SELECT COUNT(emp.birth_date) as salario 
FROM employees emp 
WHERE emp.birth_date=e.birth_date 
GROUP BY emp.birth_date) as cant_personas FROM employees e

D.

SELECT e.*, (SELECT COUNT(emp.birth_date) as salario FROM employees emp WHERE emp.birth_date=e.birth_date GROUP BY emp.birth_date) as cant_personas , (SELECT COUNT(emp.birth_date) as salario FROM employees emp WHERE emp.birth_date in (SELECT DATE_SUB(birth_date,INTERVAL 1 DAY) fecha FROM employees where employees.birth_date=e.birth_date ) GROUP BY emp.birth_date) as Antes, (SELECT COUNT(emp.birth_date) as salario FROM employees emp WHERE emp.birth_date in (SELECT DATE_ADD(birth_date,INTERVAL 1 DAY) fecha FROM employees where employees.birth_date=e.birth_date ) GROUP BY emp.birth_date) as Despues FROM employees e