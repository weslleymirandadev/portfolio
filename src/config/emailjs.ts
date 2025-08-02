import dotenv from 'dotenv'

dotenv.config()

export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.SERVICE_ID!,
  TEMPLATE_ID: process.env.TEMPLATE_ID!,
  PUBLIC_KEY: process.env.PUBLIC_KEY!,
}

export const EMAIL_TEMPLATE = {
  to_name: 'Weslley Miranda',
  from_name: '',
  from_email: '',
  message: '',
  reply_to: '',
} 