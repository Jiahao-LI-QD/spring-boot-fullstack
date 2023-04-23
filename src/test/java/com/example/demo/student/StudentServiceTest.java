package com.example.demo.student;

import com.example.demo.exceptions.EmailExistException;
import com.example.demo.exceptions.StudentNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    // StudentRepository is tested.
    @Mock
    private StudentRepository studentRepository;
//    private AutoCloseable autoCloseable;
    private StudentService underTest;

    @BeforeEach
    void setUp() {
//        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new StudentService(studentRepository);
    }

//    @AfterEach
//    void tearDown() throws Exception {
//        autoCloseable.close();
//    }

    @Test
    void canGetAllStudents() {
        // when
        underTest.getAllStudents();

        // then
        verify(studentRepository).findAll();
    }

    @Test
    void canAddStudent() {
        // Given
        String email = "jamila@gmail.com";
        Student student = new Student(
                "Jamila",
                "Smith",
                email,
                Gender.FEMALE
        );

        // When
        underTest.addStudent(student);

        // Then
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        verify(studentRepository).save(studentArgumentCaptor.capture());
        Student capturedStudent = studentArgumentCaptor.getValue();
        assertThat(capturedStudent).isEqualTo(student);
    }

    @Test
    void addStudentIfEmailExistedThrow() {
        // Given
        String email = "jamila@gmail.com";
        Student student = new Student(
                "Jamila",
                "Smith",
                email,
                Gender.FEMALE
        );

        given(studentRepository.selectExistsByEmail(email)).willReturn(true);
        // When
        // Then
        assertThatThrownBy(() -> underTest.addStudent(student))
                .isInstanceOf(EmailExistException.class)
                .hasMessageContaining("Email " + student.getEmail() + " already exists!");
        verify(studentRepository, never()).save(any()); // check after throws, save is not triggered.
    }

    @Test
    void canDeleteStudent() {
        // Given
        Long id = 1l;

        given(studentRepository.existsById(id)).willReturn(true);
        // When
        underTest.deleteStudent(id);

        // Then
        ArgumentCaptor<Long> idCaptured = ArgumentCaptor.forClass(Long.class);
        verify(studentRepository).deleteById(idCaptured.capture());
        Long longValue = idCaptured.getValue();
        assertThat(longValue).isEqualTo(id);
    }

    @Test
    void deleteUnlistedStudentThrows() {
        // Given
        Long id = 1l;

        given(studentRepository.existsById(id)).willReturn(false);

        assertThatThrownBy(() -> underTest.deleteStudent(id))
                .isInstanceOf(StudentNotFoundException.class)
                .hasMessageContaining("Student with student id " + id + " does not exist!");
        verify(studentRepository, never()).deleteById(any());
    }
}