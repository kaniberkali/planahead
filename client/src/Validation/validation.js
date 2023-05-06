import * as Yup from 'yup';

const userRegisterSchema = Yup.object().shape({
    name:Yup.string().required('Bu alan zorunludur').matches(/^[aA-zZ\s]+$/, "Yanlızca alfabetik karakter kullanılabilir."),
    surname:Yup.string().required('Bu alan zorunludur').matches(/^[aA-zZ\s]+$/, "Yanlızca alfabetik karakter kullanılabilir."),
    password:Yup.string().required('Bu alan zorunludur').min(8, 'Şifre en az 8 karakterli olabilir.'),
    email:Yup.string().email('Lütfen bir email adresi girin...').required('Bu alan zorunludur')
});

const userLoginSchema = Yup.object().shape({
    email:Yup.string().email('Lütfen bir email adresi girin...').required('Bu alan zorunludur'),
    password:Yup.string().required('Bu alan zorunludur').min(8, 'Şifre en az 8 karakterli olabilir.')
    .matches(/^[aA-zZ\s]+$/, "Şifrede yanlızca alfabetik karakterler olmalıdır..."),
});

export { userRegisterSchema , userLoginSchema}