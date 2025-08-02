export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_SERVICE_ID!,
  TEMPLATE_ID: import.meta.env.VITE_TEMPLATE_ID!,
  PUBLIC_KEY: import.meta.env.VITE_PUBLIC_KEY!,
}

export const EMAIL_TEMPLATE = {
  to_name: 'Weslley Miranda',
  from_name: '',
  from_email: '',
  message: '',
  reply_to: '',
} 