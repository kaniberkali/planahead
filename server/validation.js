const Yup = require('yup');

const userRegisterSchema = Yup.object().shape({
    username:Yup.string().required('Bu alan zorunludur').matches(/^[aA-zZ\s]+$/, "Yanlızca alfabetik karakter kullanılabilir."),
    password:Yup.string().required('Bu alan zorunludur').min(8, 'Şifre en az 8 karakterli olabilir.')
        .matches(/^[aA-zZ\s]+$/, "Şifrede yanlızca alfabetik karakterler olmalıdır..."),
    email:Yup.string().email('Lütfen bir email adresi girin...').required('Bu alan zorunludur'),
});

module.export = {userRegisterSchema}