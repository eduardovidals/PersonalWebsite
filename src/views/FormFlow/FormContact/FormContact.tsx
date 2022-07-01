import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "store/hooks";
import {updateScreen} from "store/formScreen/formScreen.slice";
import {
  FormContactContainer, FormContactFormResponse, FormContactForm, FormContactReachOut, FormSectionHeader
} from "views/FormFlow/FormContact/FormContact.styles";
import FormInput from "components/forms/FormInput/FormInput";
import FormTextArea from "components/forms/FormTextArea/FormTextArea";
import FormSubmit from "components/forms/FormSubmit/FormSubmit";
import Aos from "aos";
import emailjs from "@emailjs/browser";

function FormContact() {
  const [formErrorResponse, setFormErrorResponse] = useState('');

  // form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Aos.init();
  }, [])


  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs.sendForm(process.env.REACT_APP_SERVICE_ID as string, process.env.REACT_APP_TEMPLATE_ID as string, formRef.current, process.env.REACT_APP_PUBLIC_KEY)
        .then(() => {
          dispatch(updateScreen('FormSuccessScreen'));
        }, () => {
          setFormErrorResponse('There was an error processing your request!');
        });
    }
  };

  return (
    <FormContactContainer data-aos={'fade-up'} data-aos-duration={2000}>
      <FormSectionHeader> Let's talk </FormSectionHeader>
      <FormContactReachOut>
        If you want to have a coffee chat or just want to ask a simple question, then feel free to reach out
        to me by using the form below and I'll get back to you promptly.
      </FormContactReachOut>

      {formErrorResponse &&
        <FormContactFormResponse>
          {formErrorResponse}
        </FormContactFormResponse>
      }
      <FormContactForm onSubmit={(e) => formSubmit(e)} ref={formRef}>
        <FormInput htmlFor={'fullName'} labelText={'Full Name'} placeholder={'Enter your full name'}
                   setTextField={setName} name={'from_name'} required={true}/>
        <FormInput htmlFor={'email'} labelText={'Email'} placeholder={'Enter your email'}
                   setTextField={setEmail} name={'reply_to'} required={true} email={true}/>
        <FormTextArea htmlFor={'message'} labelText={'Message'} placeholder={'Enter your message'}
                      setTextField={setMessage} name={'message'} required={true}/>
        <FormSubmit value={'Submit'}/>
      </FormContactForm>
    </FormContactContainer>
  )
}

export default FormContact;


