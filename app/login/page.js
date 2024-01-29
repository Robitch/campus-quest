// import AcmeLogo from '@/app/ui/acme-logo';
// import LoginForm from '@/app/ui/login-form';

// export default function LoginPage() {
//     return (
//         <main className="flex items-center justify-center md:h-screen">
//             <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
//                 <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
//                     <div className="w-32 text-white md:w-36">
//                         <AcmeLogo />
//                     </div>
//                 </div>
//                 <LoginForm />
//             </div>
//         </main>
//     );
// }

"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Snackbar from '@/app/components/Snackbar';

const Login = () => {
    const Router = useRouter();
    const [type, setType] = useState('error');
    const [message, setMessage] = useState('');
    const [handleSnackbar, setHandleSnackbar] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        const emailCheck = 'test@gmail.com';
        const passwordCheck = 'test';

        // Ajoute ici la logique de gestion de la connexion (par exemple, envoi des données au serveur)

        // console.log le contenu des champs
        console.log(e.target.email.value);
        console.log(e.target.password.value);


        // Redirige l'utilisateur vers la page d'accueil si les champs sont valides
        if (e.target.email.value === emailCheck && e.target.password.value === passwordCheck) {
            Router.push('/');
        } else {
            // alert('Mauvais identifiants');
            setMessage('Mauvais identifiants');
            setType('error');
            setHandleSnackbar(true);

        }

    };

    return (
        // <div className="min-h-screen flex items-center justify-center">
        //     <div className="bg-white p-8 shadow-md rounded-md w-96">
        //         <h2 className="text-2xl font-semibold mb-6">Login</h2>
        //         <form onSubmit={handleSubmit}>
        //             <div className="mb-4">
        //                 <label htmlFor="email" className="block text-sm font-medium text-gray-600">
        //                     Email
        //                 </label>
        //                 <input
        //                     type="email"
        //                     id="email"
        //                     name="email"
        //                     required
        //                     className="mt-1 p-2 w-full border rounded-md text-gray-900"
        //                 />
        //             </div>
        //             <div className="mb-4">
        //                 <label htmlFor="password" className="block text-sm font-medium text-gray-600 ">
        //                     Password
        //                 </label>
        //                 <input
        //                     type="password"
        //                     id="password"
        //                     name="password"
        //                     required
        //                     className="mt-1 p-2 w-full border rounded-md text-gray-900"
        //                 />
        //             </div>
        //             <button
        //                 type="submit"
        //                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        //             >
        //                 Login
        //             </button>
        //         </form>
        //     </div>
        // </div>
        <div className="relative h-screen w-screen overflow-hidden">
            <div className="h-full w-full opacity-50 bg-cover" style={{ backgroundImage: "url(/mountain-background.jpg)" }}></div>
            <div className="absolute bottom-0 flex h-3/4 w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow">
                <form className="mt-10 space-y-8 px-10 py-10 text-center" onSubmit={handleSubmit} >
                    <div className="group relative">
                        <input type="text" id="email" required className="peer h-14 w-full rounded-3xl bg-white bg-opacity-30 px-4 text-sm outline-none text-white" />
                        <label htmlFor="email" className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white">Username</label>
                    </div>

                    <div className="group relative">
                        <input type="password" id="password" required className="peer h-14 w-full rounded-3xl bg-white bg-opacity-30 px-4 text-sm outline-none text-white" />
                        <label htmlFor="password" className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white">Password</label>
                    </div>

                    <button className="h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-blue-800">Login</button>

                    <a href="#" className="inline-flex !w-auto justify-center font-medium text-white">Forgot password?</a>
                </form>

                <p className="gap-2 text-center text-white">
                    Don't have an account?
                    <a href="#" className="font-semibold text-blue-900 hover:text-blue-800">Sign up</a>
                </p>

                <a href="#" className="border-white-500 group m-auto mb-4 mt-5 inline-flex h-12 w-[320px] items-center justify-center space-x-2 rounded-3xl border px-4 py-2 transition-colors duration-300 hover:border-blue-500 hover:bg-blue-500 focus:outline-none">
                    <span>
                        <svg className="text-white" width="20" height="20" fill="currentColor">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                    </span>
                    <span className="text-sm font-medium text-white">Twitter</span>
                </a>

                <a href="#" className="border-white-500 group m-auto my-0 inline-flex h-12 w-[320px] items-center justify-center space-x-2 rounded-3xl border px-4 py-2 transition-colors duration-300 hover:border-black hover:bg-black focus:outline-none">
                    <span>
                        <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                            <path fillRule="text-white" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                    </span>
                    <span className="text-sm font-medium text-white">Github</span>
                </a>
            </div>
            {/* <Snackbar message={message} type={type} handle={handleSnackbar} /> */}
        </div>
    );
};

export default Login;