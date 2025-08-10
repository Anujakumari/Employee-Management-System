package com.project.employeemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employeemanagement.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
