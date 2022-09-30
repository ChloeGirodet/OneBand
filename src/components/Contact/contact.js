import React from 'react';
import './contact.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

function Contact() {

  const schema = yup
    .object({
      firstname: yup
        .string()
        .max(50)
        .required('Merci de saisir votre prénom'),
      lastname: yup
        .string()
        .max(50)
        .required('Merci de saisir votre nom'),
      email: yup
        .string()
        .email('Merci de saisir une adresse mail valide')
        .max(255)
        .required('Merci de saisir une adresse mail'),
      message: yup.string().required('Merci de saisir un message'),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, r) => {
    const templateId = 'template_40kpkh4';
    const serviceId = 'service_u6sbcmp';
    sendFeedback(serviceId, templateId, {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      message: data.message,
      reply_to: r.target.reset(),
    });
  };

  const sendFeedback = (serviceId, templateId, variables) => {
    emailjs
      .send(serviceId, templateId, variables, '01vVGqE9R4lPQ5qm0')
      .then((res) => {
        toast.success('Votre message est envoyé, il sera traité au plus vite');
      })
      .catch((err) => {
        toast.error('Une erreur est survenue, merci de revérifier la saisie du formulaire.');
      })
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

        <div className="flex flex-col space-y-5 md:mt-40 text-center">
          <p className="text-base text-slate-200">- Des suggestions à nous soumettre ?</p>
          <p className="text-base text-slate-200">- Un problème dans l’utilisation du site ?</p>
          <p className="text-base text-slate-200">N’hésitez pas à nous transmettre votre message !</p>
        </div>

        <div>
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-emerald-500">Contacter l'équipe de OneBand</h2>

          <form action="" className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="firstname" className="sr-only">Firstname</label>
              <input type="text" id="firstname" name="firstname"
                placeholder="Prénom"
                className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register('firstname')}
              />
              {errors.firstname && <p id="c-yup">{errors.firstname.message}</p>}
            </div>
            <div>
              <label htmlFor="lastname" className="sr-only">Lastname</label>
              <input type="text" id="lastname" name="lastname"
                placeholder="Nom"
                className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register('lastname')}
              />
              {errors.lastname && <p id="c-yup">{errors.lastname.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input type="email" id="email" name="email"
                placeholder="Adresse Email"
                className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                {...register('email')}
              />
              {errors.email && <p id="c-yup">{errors.email.message}</p>}
            </div>
            <div className="col-span-full">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea name="message" id="message" cols="30" rows="4"
                placeholder="Votre message"
                className="form-textarea resize-none appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                {...register('message')}
              ></textarea>
              {errors.message && <p id="c-yup">{errors.message.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Nous contacter
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact;