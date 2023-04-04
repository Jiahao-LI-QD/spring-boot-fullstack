package com.example.demo.student;

import com.example.demo.exceptions.ApiException;
import com.example.demo.exceptions.EmailExistException;
import com.example.demo.exceptions.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public void addStudent(Student student){
        // check email is taken
        Boolean emailExists = studentRepository.selectExistsByEmail(student.getEmail());
        if (emailExists){
            throw new EmailExistException("Email " + student.getEmail() + " already exists!");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId){
        // check studentId
        if (!studentRepository.existsById(studentId)){
            throw new StudentNotFoundException("Student with student id " + studentId + " does not exist!");
        }
        studentRepository.deleteById(studentId);
    }
}
