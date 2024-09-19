import { useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import PrivateLayout from "@/components/layouts/PrivateLayout";
import ToastService from '@/services/toast';
import { Card, Input, Label, Button } from "@/components";
import i18n from '@/locales/i18n';
import translationsYup from '@/locales/yupMessages';
import useAuth from '@/hooks/useAuth';

yup.setLocale(translationsYup);

const schema = yup.object().shape({
  email: yup.string().email().required().label(i18n.t("fields.email")),
  name: yup.string().required().label(i18n.t("fields.name")),
  password: yup.string()
    .nullable()
    .transform((value, originalValue) => originalValue.trim() == "" ? null : value)
    .min(6)
    .label(i18n.t("fields.password")),
});

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const { t } = useTranslation();
  const titlePage = t("pages.profile.title");
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);
  const [values, setValues] = useState({
    name: user?.name || t('fields.notFound'),
    email: user?.email || t('fields.notFound'),
    password: ''
  });

  async function handleSubmit() {
    if(!isUpdating) {
      setIsUpdating(true);
      try {
        // Validate fields
        await schema.validate(values, { abortEarly: true });

        // Request to update
        await updateUserProfile(values.name, values.email, values.password || null);

        ToastService.success(t("pages.profile.userEdited"));

        router.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          ToastService.error(`${error.params?.label}: ${error.message}`);
        } else {
          ToastService.error(t("errors.default.message"));
        }
      } finally {
        setIsUpdating(false);
      }
    } 
  } 
  
  return (
    <PrivateLayout title={titlePage}>
      <Card>
        <Card.Header>
          <div>
            <h3 className="font-medium mb-1">{t("pages.profile.cardTitle")}</h3>
            <span className="text-xs">{t("pages.profile.cardDescription")}</span>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4 md:w-1/3">
              <Label className="px-1" htmlFor="name">{t("fields.name")} <span className='text-danger'>*</span></Label>

              <Input 
                name='name'
                id='name'
                type='text'
                value={values.name}
                onChange={(event) => setValues({ ...values, name: event.target.value })}
              />
            </div>
            <div className="w-full px-2 mb-4 md:w-1/3">
              <Label className="px-1" htmlFor="name">{t("fields.email")} <span className='text-danger'>*</span></Label>
              
              <Input 
                name='email'
                id='email'
                type='email'
                value={values.email}
                onChange={(event) => setValues({ ...values, email: event.target.value })}
              />
            </div>
            <div className="w-full px-2 mb-4 md:w-1/3">
              <Label className="px-1" htmlFor="password">{t("fields.newPassword")} {t("fields.optional")}</Label>
              
              <Input 
                name='password'
                id='password'
                type='password'
                value={values.password}
                onChange={(event) => setValues({ ...values, password: event.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-4 mt-4">
            <Button className='normal-case' size="sm" variant='primary' loading={isUpdating} onClick={handleSubmit}>
              {t("pages.profile.save")}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </PrivateLayout>
  )
}
