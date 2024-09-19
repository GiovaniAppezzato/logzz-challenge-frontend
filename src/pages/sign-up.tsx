import { useState } from 'react';
import Link from 'next/link';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import ToastService from '@/services/toast';
import PublicLayout from "@/components/layouts/PublicLayout";
import useAuth from '@/hooks/useAuth';
import { Card, Button, Input, Label } from '@/components';
import i18n from '@/locales/i18n';
import translationsYup from '@/locales/yupMessages';

yup.setLocale(translationsYup);

const schema = yup.object().shape({
  password: yup.string().required().min(6).label(i18n.t("fields.password")),
  email: yup.string().email().required().label(i18n.t("fields.email")),
  name: yup.string().required().label(i18n.t("fields.name")),
});

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { t } = useTranslation();
  const { signUp } = useAuth();

  async function handleSubmit() {
    if(!loading) {
      setLoading(true);
      try {
        // Validate fields
        await schema.validate(values, { abortEarly: true });

        // Request to sign up
        await signUp(values.name, values.email, values.password);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          ToastService.error(`${error.params?.label}: ${error.message}`);
        } else {
          ToastService.error(t("errors.default.message"));
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <PublicLayout>
      <Card className="w-full max-w-lg overflow-hidden">
        <Card.Body className="p-8 md:p-10">
          <div className="text-center">
            <h3 className="font-[600] text-lg dark:text-gray-300">
              {t("pages.signUp.title")}
            </h3>
            <p className="mt-1 mb-8 text-[13px] leading-normal text-gray-400">
              {t("pages.signUp.description")}
            </p>
          </div>

          <div>
            <Label className="px-1" htmlFor="email">{t("fields.name")} <span className='text-danger'>*</span></Label>

            <Input 
              name='name'
              id='name'
              value={values.name}
              onChange={(event) => setValues({ ...values, name: event.target.value })}
            />
          </div>

          <div className="mt-5">
            <Label className="px-1" htmlFor="email">{t("fields.email")} <span className='text-danger'>*</span></Label>

            <Input 
              name='email'
              id='email'
              type='email'
              value={values.email}
              onChange={(event) => setValues({ ...values, email: event.target.value })}
            />
          </div>

          <div className="mt-5">
            <Label className="px-1" htmlFor="password">{t("fields.password")} <span className='text-danger'>*</span></Label>

            <Input 
              name='password'
              id='password'
              type='password'
              value={values.password}
              onChange={(event) => setValues({ ...values, password: event.target.value })}
            />
          </div>

          <div className="mt-8">
            <Button className='normal-case w-full' variant='primary' loading={loading} onClick={handleSubmit}>
              {t("pages.signUp.create")}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs">
              {t("pages.signUp.alreadyHave")}
              <Link href="/sign-in" className="text-primary font-medium hover:underline">
                {' '} {t("pages.signUp.doSignIn")}
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </PublicLayout>
  )
}
