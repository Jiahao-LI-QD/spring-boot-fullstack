package com.example.demo.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class StudentRepositoryTest {

    @Autowired
    private StudentRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void checkIfStudentEmailExists() {
        // given
        String email = "jamila@gmail.com";
        Student student = new Student(
                "Jamila",
                "Smith",
                email,
                Gender.FEMALE
        );
        underTest.save(student);

        // when
        Boolean result = underTest.selectExistsByEmail(email);

        // then
        assertThat(result).isTrue();
    }

    @Test
    void checkIfStudentEmailDoesNotExist() {
        // given
        String email = "jamila@gmail.com";

        // when
        Boolean result = underTest.selectExistsByEmail(email);

        // then
        assertThat(result).isFalse();
    }
}