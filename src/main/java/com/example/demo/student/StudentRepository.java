package com.example.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 then TRUE else FALSE end " +
            "from Student s " +
            "where s.email = :email")
    Boolean selectExistsByEmail(@Param("email")String email);


}
