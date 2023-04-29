import { useContext } from 'react'
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';
import { Context } from '../../Context/context'
import 'bootstrap/dist/css/bootstrap.min.css';

function AddNewNote() {
    const {setNewNote} = useContext(Context);
    const NewNote = Yup.object().shape({
        icon : Yup.string().required("Lütfen bir ikon seçin..."),
        date : Yup.date().min(new Date().toISOString().substring(0,10),"Lütfen geçerli bir tarih seçin...").required('Lütfen bir tarih seçin...'),
        time : Yup.string().required('Lütfen bu not için bir saat seçin...'),
        title : Yup.string().min(3,'Lütfen en az 3 en fazla 50 karakter girin...')
        .max(50,'Lütfen en az 3 en fazla 50 karakter girin...').required('Lütfen bir başlık girin...'),
        detail : Yup.string().min(3,'Lütfen en az 3 en fazla 500 karakter girin...').required('Lütfen detay girin...')
        .max(500,'Lütfen en az 3 en fazla 500 karakter girin...')
    })
    const cancelProcess = () => {
        setNewNote(false);
    }
  return (
    <div className='w-100 h-100' style={{overflowY : 'auto'}}>
        <Formik initialValues={{
            icon: '',
            date: '',
            time: '',
            title: '',
            detail: '',
            category: ''
        }}
        validationSchema={NewNote}
        onSubmit={async (values) => {
            console.log(values);
            // setNewNote(false);
        }}
        >
            {({errors,touched}) => (
                <Form className='container d-flex flex-column align-items-center'>
                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='icon'>İcon</label><br></br>
                    <Field className = 'form-control' type='text' id='icon' name = 'icon'/>
                    {errors.icon && touched.icon ? (
                        <div className='text-danger sm'><small>{errors.icon}</small></div>
                    ):null}
                </div>

                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='date'>Date</label><br></br>
                    <Field className = 'form-control w-100' type='date' id='date' name = 'date' value = {new Date()}/>
                    {errors.date && touched.date ? (
                        <div className='text-danger sm'><small>{errors.date}</small></div>
                    ):null}
                </div>

                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='time'>Time</label><br></br>
                    <Field className = 'form-control' type='time' id='time' name = 'time'/>
                    {errors.time && touched.time ? (
                        <div className='text-danger sm'><small>{errors.time}</small></div>
                    ):null}
                </div>

                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='title'>Title</label><br></br>
                    <Field className = 'form-control' type='text' id='title' name = 'title'/>
                    {errors.title && touched.title ? (
                        <div className='text-danger sm'><small>{errors.title}</small></div>
                    ):null}
                </div>

                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='detail'>Detail</label><br></br>
                    <Field as='textarea' className = 'form-control' id='detail' name = 'detail'/>
                    {errors.detail && touched.detail ? (
                        <div className='text-danger sm'><small>{errors.detail}</small></div>
                    ):null}
                </div>

                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='category'>Category</label><br></br>
                    <Field as='select' className = 'form-control' id='category' name = 'category'>
                        <option value="Rutin">Rutin</option>
                        <option value="Haftalık">Haftalık</option>
                        <option value="Aylık">Aylık</option>
                        <option value="Yıllık">Yıllık</option>
                    </Field>
                </div>
                <div className='d-flex w-100 mt-2 mb-2'>
                    <button className='btn btn-success w-75 mt-3 p-1 me-2' type="submit">Kaydet</button>
                    <button className='btn btn-danger w-75 mt-3 p-1' type='button' onClick={cancelProcess}>İptal</button>
                </div>
            </Form>
            )}

        </Formik>
    </div>
  )
}

export default AddNewNote