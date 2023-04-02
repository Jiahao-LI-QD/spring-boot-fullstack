package com.example.demo.student;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "Student")
@Table(name = "student")
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
    private Long id;

    @Column(
            name = "last_name",
            nullable = false
    )
    private String lastName;

    @Column(
            name = "first_name",
            nullable = false
    )
    private String firstName;

    @Column(
            name = "email",
            nullable = false
    )
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "gender",
            nullable = false
    )
    private Gender gender;
}
