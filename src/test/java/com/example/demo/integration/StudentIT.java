package com.example.demo.integration;

import com.example.demo.student.Gender;
import com.example.demo.student.Student;
import com.example.demo.student.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.Random;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
/* This works only for .properties extension. not for yml
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
*/
@ActiveProfiles("it")
@AutoConfigureMockMvc
public class StudentIT {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private StudentRepository studentRepository;
    private final Faker faker = new Faker();
    private final Random random = new Random();
    private final Gender[] genders = Gender.class.getEnumConstants();

    @Test
    void canRegisterNewStudent() throws Exception{
        // Given
        String firstName = faker.name().firstName();
        String email = faker.internet().emailAddress(firstName);
        Gender gender = genders[random.nextInt(genders.length)];
        Student student = new Student(
                firstName,
                faker.name().lastName(),
                email,
                gender
        );

        // When
        ResultActions resultActions = mockMvc
                .perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)));

        // Then
        resultActions.andExpect(status().isOk());
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList)
                .usingElementComparatorIgnoringFields("id")
                .contains(student);
    }

    @Test
    void canDeleteExistingStudent() throws Exception{
        // Given
        String firstName = faker.name().firstName();
        String email = faker.internet().emailAddress(firstName);
        Gender gender = genders[random.nextInt(genders.length)];
        Student student = new Student(
                firstName,
                faker.name().lastName(),
                email,
                gender
        );

        mockMvc.perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)))
                .andExpect(status().isOk());

        MvcResult getStudentResult = mockMvc.perform(get("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = getStudentResult
                .getResponse()
                .getContentAsString();

        List<Student> students = objectMapper.readValue(
                contentAsString,
                new TypeReference<>() {
                }
        );

        long id = students.stream()
                .filter(s -> s.getEmail().equals(email))
                .map(Student::getId)
                .findFirst()
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Student with email " + email + " does not exist!"
                        ));

        // When
        ResultActions resultActions = mockMvc
                .perform(delete("/api/v1/students/" + id));

        // Then
        resultActions.andExpect(status().isOk());
        Boolean exists = studentRepository.existsById(id);
        assertThat(exists).isFalse();
    }
}
