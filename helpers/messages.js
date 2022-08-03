let arabic = {
    serverError: "حدث خطا غير متوقع",
    unauthorized: "لا يمكن الوصول الي هذا النقطة حاليا",
    genrale: {
        required: "هذا الحقل مطلوب",
        unique: "تم استخدامه من قبل",
        lowercase: "يجب ان تكون كل الحروف صغيرة"
    },
    register: {
        success: "تم تسجيل الدخول بنجاح, في انتظار القبول من المدرس",
        faild: {
            email: "البريد الالكتروني مستخدم من قبل",
            phoneNumber: "الرقم الهاتف مستخدم من قبل",
            name: "يجب ان يكون الاسم رباعي",
        }
    },
    login: {
        success: "تم تسجيل الدخول بنجاح",
        faild: {
            email: "البريد الالكتروني المستخدم غير صحيح",
            password: "كلمة المرور خاطئة",
            unaccepted: "لا يمكنك الدخول الي التطبيق الان . انت في انتظار القبول من المدرس"
        }
    }
}

module.exports = {
    serverError: "something went wrong",
    unauthorized: "should login first",
    notFound: "not found",
    oldData: "data is not old, please send new data",
    genrale: {
        required: "field is required",
        unique: "it is used before",
        lowercase: "letter should be capital",
        incorrectId: "incorrect id of this field",
        isNumber: "should be number"
    },
    register: {
        success: "success register, You must wait until you are accepted by the teacher",
        faild: {
            email: "email is used before",
            phoneNumber: "phoneNumber is used before",
            name: "The name must be quadruple"
        }
    },
    login: {
        success: "success login",
        faild: {
            email: "email is not used",
            password: "incorrect password",
            unaccepted: "you can't enter, You must wait until you are accepted by the teacher"
        }
    },
    course: {
        success: {
            create: "course is created successfully",
            update: "course is updated Successfully"
        },
        faild: {
            update: "something went wrong, when update this course"
        }

    },
    grade: {
        success: {
            create: "grade is created successfully",
            update: "grade is updated Successfully"
        },
        faild: {
            update: "something went wrong, when update this grade"
        }

    },
    unit: {
        success: {
            create: "unit is created and added to course successfully",
            update: "unit is updated Successfully"
        },
        faild: {
            update: "something went wrong, when update this unit"
        }
    },
    unitExam: {
        success: {
            create: "exam is created and added to unit successfully"
        },
        faild: {
            create: "can't add exam to this unit, because unit contains exam already"
        }
    },
    lesson: {
        success: {
            create: "lesson is created and added to course successfully",
            update: "lesson is updated Successfully",
            delete: "lesson is deleted successfully"
        },
        faild: {
            update: "something went wrong, when update this lesson",
            delete: "lesson not found to delete"
        }

    },
    revision: {
        success: {
            create: "revision is created and added to course successfully",
            update: "revision is updated Successfully",
            delete: "revision is deleted successfully"
        },
        faild: {
            update: "something went wrong, when update this revision",
            delete: "revision not found to delete"
        }

    },
    acceptedStudent: {
        success: {
            accepted: "student is accepted successfully",
            delete: "unaccepted student is deleted successfully"
        },
        faild: {
            alreadyAccepted: "can't accept this student because student is accpeted already",
            delete: "unaccepted student not found to delete"
        }
    }
}

// module.exports = {
//     genrale: {
//         required: "هذا الحقل متطلب",
//         unique: "تم استخدامه من قبل",
//         lowercase: "يجب ان تكون كل الحروف صغيرة"
//     },
//     register: {
//         success: "تم تسجيل الدخول بنجاح, في انتظار القبول من المدرس",
//         faild: {
//             email: "البريد الالكتروني مستخدم من قبل",
//             phoneNumber: "الرقم الهاتف مستخدم من قبل",
//             name: "يجب ان يكون الاسم رباعي",
//         }
//     },
//     login: {
//         success: "تم تسجيل الدخول بنجاح",
//         faild: {
//             email: "البريد الالكتروني المستخدم غير صحيح",
//             password: "كلمة المرور خاطئة",
//             unaccepted: "لا يمكنك الدخول الي التطبيق الان . انت في انتظار القبول من المدرس"
//         }
//     }
// }