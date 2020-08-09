import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import {useHistory} from 'react-router-dom';

import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherForm() {


    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClasse(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            history.push('/');
        }).catch(erro => {
            alert('ERR');
        })

    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aula."
            description="O primeiro paso é prencher esse formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClasse}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input name="name" label="Nome completo" value={name} onChange={(e) => {setName(e.target.value)}} />
                        <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}} />
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}} />
                        <Textarea name="bio" label="Biografia"  value={bio} onChange={(e) => {setBio(e.target.value)}} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject"
                            label="Custo da sua hora por aula"
                            value={subject} 
                            onChange={(e) => {setSubject(e.target.value)}} 
                            options={[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Ciências', label: 'Ciências'},
                                {value: 'Educação física', label: 'Educação física'},
                                {value: 'Física', label: 'Física'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'História', label: 'História'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Química', label: 'Química'},
                            ]}
                        />
                        <Input name="cost"
                        label="Custo da sua hora por aula" 
                        value={cost}
                        onChange={(e) => {setCost(e.target.value)}} />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis 
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div className="schedule-item" key={scheduleItem.week_day}>
                                    <Select 
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            {value: '0', label: 'Domingo'},
                                            {value: '1', label: 'Segunda-feira'},
                                            {value: '2', label: 'Terça-feira'},
                                            {value: '3', label: 'Quarta-feira'},
                                            {value: '4', label: 'Quinta-feira'},
                                            {value: '5', label: 'Sexta-feira'},
                                            {value: '6', label: 'Sábado-feira'},
                                        ]}
                                    />
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        value={scheduleItem.from}
                                        type="time"
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                      />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        value={scheduleItem.to}
                                        type="time" 
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;