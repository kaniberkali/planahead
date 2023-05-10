import { useContext , useEffect} from 'react'
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';
import { Context } from '../../Context/context'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const getCurrentWeek = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const firstMonday = new Date(startOfYear.getTime());
    while (firstMonday.getDay() !== 1) {
    firstMonday.setDate(firstMonday.getDate() + 1);
    }
    const elapsedDays = Math.floor((now - firstMonday) / 86400000);
    const currentWeek = Math.ceil((elapsedDays + 1) / 7);
    return currentWeek;
}

const getCurrentMonth = () => {
    return new Date().getMonth() + 1;
}

const getCurrentYear = () => {
    return new Date().getFullYear();
}

function AddNewNote() {
    const {setNewNote, selected, selectIcon, setIconModal, setSelected, setSelectIcon} = useContext(Context);
    const navigate = useNavigate();
    axios.get(`${process.env.REACT_APP_API_URL}/session/`,{
        headers: {
          'Authorization': `Basic ${Cookies.get('token')}`
        }})
    .then(function (response) {
    })
    .catch(function (error) {
      navigate('/login');
    });
    const NewNote = Yup.object().shape({
        routine : selected == 'routine' && Yup.string().required('Lütfen bu not için bir saat seçin...'),
        week : selected == 'week' &&  Yup.string().test(
            'is-greater-than-currentWeek',
            'Lütfen geçerli bir tarih girin...',
            function(value){
                if(value){
                    const valueWeek = parseInt(value.substring(6,8));
                    const valueYear = parseInt(value.substring(0,4));
                    const currentWeek = getCurrentWeek();
                    const currentYear = getCurrentYear();
                    return (valueWeek >= currentWeek && valueYear >= currentYear );
                }
            }
        ).required('Bu alan zorunludur...'),
        month: selected == 'month' && Yup.string().test(
            'is-greater-than-currentMonth',
            'Lütfen geçerli bir tarih girin...',
            function(value){
                if(value){
                    const valueMonth = parseInt(value.substring(5,7));
                    const valueYear = parseInt(value.substring(0,4));
                    const currentMonth = getCurrentMonth();
                    const currentYear = getCurrentYear();
                    return (valueMonth >= currentMonth && valueYear >= currentYear);
                }
            }
        ).required('Bu alan zorunludur...'),
        year: selected == 'year' && Yup.string().test(
            'is-greater-than-currentYear',
            'Lütfen geçerli ve gerçekçi(max 100 yıl) bir tarih girin...',
            function(value){
                if(value){
                    const valueYear = parseInt(value);
                    const currentYear = getCurrentYear();
                    return (valueYear >= currentYear && valueYear <= currentYear + 100);
                }
            }
        ).required('Bu alan zorunludur...'),
        title : Yup.string().min(3,'Lütfen en az 3 en fazla 50 karakter girin...')
        .max(50,'Lütfen en az 3 en fazla 50 karakter girin...').required('Lütfen bir başlık girin...'),
        detail : Yup.string().min(3,'Lütfen en az 3 en fazla 500 karakter girin...')
        .max(500,'Lütfen en az 3 en fazla 500 karakter girin...')
    })
    const cancelProcess = () => {
        setNewNote(false);
    }
    const handleChange = (event) => {
        setSelected(event.target.value);
    };
  useEffect(() => {
    setSelectIcon('');
  },[selected]);
  return (
    <div className='w-100 h-100' style={{overflowY : 'auto'}}>
        <Formik initialValues={{
            routine: '',
            week: '',
            month: '',
            year: '',
            title: '',
            detail: '',
        }}
        validationSchema={NewNote}
        onSubmit={async (values) => {
            setSelectIcon('');
            setSelected('routine');
            const data = {
                type : selected,
                date: values[selected],
                title: values.title,
                icon_id: selectIcon,
                content: values.detail}
            axios.post(`${process.env.REACT_APP_API_URL}/notes`,data,{
                headers: {
                  'Authorization': `Basic ${Cookies.get('token')}`
                }})
            .then(function (response) {
                setNewNote(false);
                navigate('/');
            })
            .catch(function (error) {
            });
        }}
        >
            {({values,errors,touched}) => (
                <Form className='container d-flex flex-column align-items-center'>
                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='category'>Kategori</label><br></br>
                    <select className='form-control' name = 'category' onChange={handleChange}>
                        <option value="routine">Rutin</option>
                        <option value="week">Haftalık</option>
                        <option value="month">Aylık</option>
                        <option value="year">Yıllık</option>
                    </select>
                </div>
                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='icon'>İkon</label><br></br>
                    <Field className = 'btn btn-primary w-100 p-1' type='button' id='icon' name = 'icon' value='İkon Ekle' onClick = {() => {setIconModal(true)}}/>
                    {selectIcon.length > 0 ? <div className='text-success sm'><small>İkon seçimi yapıldı.</small></div> : null}
                </div>
                
                {selected == 'routine' &&
                    <div className='w-100'>
                        <label style={{fontSize:'14px'}} htmlFor='routine'>Saat</label><br></br>
                        <Field className = 'form-control' type='time' id='routine' name = 'routine'/>
                        {errors.routine && touched.routine ? (
                            <div className='text-danger sm'><small>{errors.routine}</small></div>
                        ):null}
                    </div>
                }

                {selected == 'week' && 
                    <div className='w-100'>
                        <label style={{fontSize:'14px'}} htmlFor='week'>Tarih</label><br></br>
                        <Field className = 'form-control w-100' type='week' id='week' name = 'week'/>
                        {errors.week && touched.week ? (
                            <div className='text-danger sm'><small>{errors.week}</small></div>
                        ):null}
                    </div>                
                }

                {selected == 'month' && 
                    <div className='w-100'>
                        <label style={{fontSize:'14px'}} htmlFor='month'>Tarih</label><br></br>
                        <Field className = 'form-control w-100' type='month' id='month' name = 'month'/>
                        {errors.month && touched.month ? (
                            <div className='text-danger sm'><small>{errors.month}</small></div>
                        ):null}
                    </div>                
                }

                {selected == 'year' && 
                    <div className='w-100'>
                        <label style={{fontSize:'14px'}} htmlFor='year'>Tarih</label><br></br>
                        <Field className = 'form-control w-100' type='' id='year' name = 'year' placeholder = 'Lütfen bir yıl girin...'/>
                        {errors.year && touched.year ? (
                            <div className='text-danger sm'><small>{errors.year}</small></div>
                        ):null}
                    </div> 
                }

                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='title'>Başlık</label><br></br>
                    <Field className = 'form-control' type='text' id='title' name = 'title'/>
                    {errors.title && touched.title ? (
                        <div className='text-danger sm'><small>{errors.title}</small></div>
                    ):null}
                </div>

                <div className='w-100'>
                    <label style={{fontSize:'14px'}} htmlFor='detail'>Detay</label><br></br>
                    <Field as='textarea' className = 'form-control' id='detail' name = 'detail'/>
                    {errors.detail && touched.detail ? (
                        <div className='text-danger sm'><small>{errors.detail}</small></div>
                    ):null}
                </div>
                <div className='d-flex w-100 pt-1'>
                    <button className='btn btn-success w-75 p-1 me-2' type="submit">Kaydet</button>
                    <button className='btn btn-danger w-75 p-1' type='button' onClick={cancelProcess}>İptal</button>
                </div>
            </Form>
            )}

        </Formik>
    </div>
  )
}

export default AddNewNote