package com.example.demo.student;

public enum Gender {
    MALE(0),
    FEMALE(1),
    OTHER(2);

    int value;
    Gender(int value){
        this.value = value;
    }
    int getValue(){
        return this.value;
    }

}
