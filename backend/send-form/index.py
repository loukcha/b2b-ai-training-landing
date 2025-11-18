'''
Business: Send contact form data via email
Args: event - dict with httpMethod, body (name, email, phone)
      context - object with attributes: request_id, function_name
Returns: HTTP response dict
'''

import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import os

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', '')
    email = body_data.get('email', '')
    phone = body_data.get('phone', '')
    
    if not name or not email or not phone:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'})
        }
    
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.yandex.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    recipient_email = os.environ.get('RECIPIENT_EMAIL', 'email@btbsales.ru')
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта от {name}'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    
    html_body = f'''
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #8B5CF6; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">
            📧 Новая заявка на программу обучения
          </h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Имя:</strong> 
              <span style="color: #000;">{name}</span>
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Email:</strong> 
              <a href="mailto:{email}" style="color: #8B5CF6; text-decoration: none;">{email}</a>
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Телефон:</strong> 
              <a href="tel:{phone}" style="color: #8B5CF6; text-decoration: none;">{phone}</a>
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #E5DEFF; border-left: 4px solid #8B5CF6; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #555;">
              Заявка отправлена с сайта <strong>btbsales.ru</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
    '''
    
    text_body = f'''
    Новая заявка на программу обучения
    
    Имя: {name}
    Email: {email}
    Телефон: {phone}
    
    Заявка отправлена с сайта btbsales.ru
    '''
    
    part1 = MIMEText(text_body, 'plain', 'utf-8')
    part2 = MIMEText(html_body, 'html', 'utf-8')
    
    msg.attach(part1)
    msg.attach(part2)
    
    if not smtp_user or not smtp_password:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Form submitted successfully (demo mode)',
                'note': 'SMTP not configured - check logs'
            })
        }
    
    with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'message': 'Заявка успешно отправлена'
        })
    }
