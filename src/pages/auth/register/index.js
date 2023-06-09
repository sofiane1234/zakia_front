import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import useFetch from '@/hooks/useFetch';

const Index = () => {

  const router = useRouter();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const {fetchData, data, error, loading} = useFetch({url:'/auth/register', method:"POST", body:userForm, token:null})
    
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      localStorage.setItem('token', data.token);
      router.push('/account/profil')
    }
  }

  return (
    <>
      <Title title="Inscription" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <Input
          label="Firstname"
          type="firstName"
          name="firstName"
          placeholder="veuillez saisir votre prénom"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.firstName}
        />
        <Input
          label="Lastname"
          type="lastName"
          name="lastName"
          placeholder="veuillez saisir votre nom"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.lastName}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="veuillez saisir votre email"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <Button
          type="submit"
          title="Se connecter"
          className="btn__secondary"
        />
      </form>
      {
        error && (
          <Notification type="warning" message={error.message} />
        )
      }
      <p>
        Vous avez déjà un compte ? <br/> <Link href="/auth/login">Connectez-vous</Link>
      </p>
    </>
  );
}

export default Index;
