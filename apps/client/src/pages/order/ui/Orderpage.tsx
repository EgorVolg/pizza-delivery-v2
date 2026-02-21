import Container from "../../../shared/ui/Container/Container";
import styles from "./Orderpage.module.css";
import { OrderInfoAside } from "./OrderInfoAside";
import { CartItemsSection } from "../shared/CartItemsSection/CartItemsSection";
import { PersonalDataSection } from "../shared/PersonalDataSection/PersonalDataSection";
import { DeliveryAddressSection } from "../shared/DeliveryAddressSection/DeliveryAddressSection";
import { useState, useEffect, type ChangeEvent } from "react";

export interface FormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  deliveryTime: string;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

const STORAGE_KEY = "orderFormData";

export const Orderpage = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
    deliveryTime: "",
  });

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData;
        setFormData(parsedData);
      } catch (error) {
        console.error("Ошибка при загрузке данных из localStorage:", error);
      }
    }
  }, []);

  // Сохранение данных в localStorage при изменении formData
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleDeliveryTimeChange = (time: string) => {
    setFormData((prev) => ({ ...prev, deliveryTime: time }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Введите фамилию";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введите телефон";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Некорректный номер телефона";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Введите адрес доставки";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      console.log("Форма отправлена:", formData);
    }
  };

  return (
    <Container className={styles.orderpage_container}>
      <h1 className={styles.title_section}>Оформление заказа</h1>

      <form onSubmit={handleSubmit} className={styles.orderpage_spacer}>
        <div className={styles.cart_items}>
          <CartItemsSection />

          <div className={styles.form}>
            <PersonalDataSection
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
            <DeliveryAddressSection
              formData={formData}
              handleChange={handleChange}
              handleDeliveryTimeChange={handleDeliveryTimeChange}
              errors={errors}
            />
          </div>
        </div>

        <OrderInfoAside />
      </form>
    </Container>
  );
};
