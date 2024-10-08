import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import PrivateLayout from "@/components/layouts/PrivateLayout";
import ToastService from '@/services/toast';
import { Card, Input, Label, Button, Avatar } from "@/components";
import i18n from '@/locales/i18n';
import translationsYup from '@/locales/yupMessages';
import ProductService from '@/services/api/product';
import { fileToBase64 } from '@/utilities/utils';
import { FaCamera, FaImage, FaTrash } from 'react-icons/fa';

yup.setLocale(translationsYup);

const schema = yup.object().shape({
  name: yup.string().required().label(i18n.t("fields.name")),
  description: yup.string().required().label(i18n.t("fields.description")),
  price: yup.string().required().label(i18n.t("fields.price")),
  category: yup.string().required().label(i18n.t("fields.category"))
});

export default function CreateProductPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const { t } = useTranslation();
  const titlePage = t("pages.createProduct.title");
  const router = useRouter();

  async function handleSubmit() {
    if(!isCreating) {
      setIsCreating(true);
      try {
        // Validate fields
        await schema.validate(values, { abortEarly: true });

        // Store product
        await ProductService.create({ ...values, price: Number(values.price) });

        // Send toast
        ToastService.success(t("pages.createProduct.productCreated"));
        
        router.push("/");
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          ToastService.error(`${error.params?.label}: ${error.message}`);
        } else {
          ToastService.error(t("errors.default.message"));
        }
      } finally {
        setIsCreating(false);
      }
    } 
  }

  async function onChangePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      const base64 = await fileToBase64(file);

      if(base64) {
        setValues({ ...values, image: base64 });
      }
    }
  }

  async function onDeletePhoto() {
    setValues({ ...values, image: "" });

    // Clean input file
    const imageInput = document.getElementById("image") as HTMLInputElement;
    if (imageInput) {
      imageInput.value = "";
    }
  }
  
  return (
    <PrivateLayout title={titlePage}>
      <Card>
        <Card.Header>
          <div>
            <h3 className="font-medium mb-1">{t("pages.createProduct.cardTitle")}</h3>
            <span className="text-xs">{t("pages.createProduct.cardDescription")}</span>
          </div>
          <Link href="/users"></Link>
        </Card.Header>
        <Card.Body>
          <div className="mb-8 mt-4">
            <div className="w-full flex flex-wrap justify-center items-start sm:pl-4 md:flex-nowrap">
              <div className="relative w-max">
                <Avatar 
                  src={values.image} 
                  icon={<FaImage className="w-6 h-6 m-auto text-gray-600" />} 
                  className="!w-24 !h-24 !text-xl" 
                />
                {values.image ? (
                  <button 
                    className="button-icon button-danger button-icon-lg cursor-pointer rounded-full absolute -bottom-0.5 -right-0.5 shadow-none border-[3px] border-navbar"
                    onClick={onDeletePhoto}
                  >
                    <FaTrash size={12} />
                  </button>
                ) : (
                  <label htmlFor='image' className="button-icon button-primary button-icon-lg cursor-pointer rounded-full absolute -bottom-0.5 -right-0.5 shadow-none border-[3px] border-navbar">
                    <FaCamera size={12} />
                  </label>
                )}
                
                <input 
                  type="file" 
                  className="hidden"
                  accept="image/*"
                  name="image"
                  id="image"
                  onChange={onChangePhoto}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4 md:w-1/3">
              <Label className="px-1" htmlFor="name">{t("fields.nameProduct")} <span className='text-danger'>*</span></Label>

              <Input 
                name='name'
                id='name'
                type='text'
                value={values.name}
                onChange={(event) => setValues({ ...values, name: event.target.value })}
              />
            </div>
            <div className="w-full px-2 mb-4 md:w-1/3">
              <Label className="px-1" htmlFor="name">{t("fields.price")} <span className='text-danger'>*</span></Label>

              <Input 
                name='price'
                id='price'
                type='number'
                value={values.price}
                onChange={(event) => setValues({ ...values, price: event.target.value })}
              />
            </div>
            <div className="w-full px-2 mb-4 md:w-1/3">
              <Label className="px-1" htmlFor="name">{t("fields.category")} <span className='text-danger'>*</span></Label>

              <Input
                name='category'
                id='category'
                type='text'
                value={values.category}
                onChange={(event) => setValues({ ...values, category: event.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4 md:w-full">
              <Label className="px-1" htmlFor="name">{t("fields.description")} <span className='text-danger'>*</span></Label>

              <textarea
                className='input'
                name='description'
                id='description'
                value={values.description}
                onChange={(event) => setValues({ ...values, description: event.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-4 mt-4">
            <Button className='normal-case' size="sm" variant='primary' loading={isCreating} onClick={handleSubmit}>
              {t("pages.createProduct.save")}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </PrivateLayout>
  )
}
