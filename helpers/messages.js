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
    genrale: {
        required: "field is required",
        unique: "it is used before",
        lowercase: "letter should be capital"
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