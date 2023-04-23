package com.example.demo.student;

import jakarta.persistence.*;
import jakarta.validation.Constraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity(name = "Student")
@Table(name = "student",
        uniqueConstraints = {
            @UniqueConstraint(
                    name = "unique_student_email",
                    columnNames = "email"
            )
        }
)
@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @SequenceGenerator(
            name = "student_id_sequence",
            sequenceName = "student_id_sequence",
            allocationSize = 1,
            initialValue = 1001
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_id_sequence"
    )
    @Column(name = "id")
    @Min(value = 0,
    message = "The minimum value for user id is 0!")
    private Long id;

    @Column(
            name = "last_name",
            nullable = false
    )
    @NotBlank(message = "Last name can not be blank!")
    private String lastName;

    @Column(
            name = "first_name",
            nullable = false
    )
    @NotBlank(message = "First name can not be blank!")
    private String firstName;

    @Column(
            name = "email",
            nullable = false
    )
    @Email(message = "Not a valid email format!")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "gender",
            nullable = false
    )
    @NotNull
    private Gender gender;

    public Student(String firstName, String lastName, String email, Gender gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }
}
