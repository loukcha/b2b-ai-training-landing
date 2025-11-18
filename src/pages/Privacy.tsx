import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold gradient-text">
            B2B Sales
          </a>
          <a href="tel:+79267318859" className="text-lg font-semibold text-primary hover:text-secondary transition-colors">
            +7 926 731 88 59
          </a>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button
          onClick={() => window.history.back()}
          variant="ghost"
          className="mb-8"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <h1 className="text-4xl font-bold mb-8 gradient-text">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности персональных данных (далее — Политика) действует в отношении 
              всей информации, которую B2B Sales (далее — Компания) может получить о пользователе во время 
              использования сайта www.btbsales.ru.
            </p>
            <p>
              Использование сайта означает безоговорочное согласие пользователя с настоящей Политикой и 
              указанными в ней условиями обработки его персональной информации.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Персональная информация пользователей</h2>
            <p>
              В рамках настоящей Политики под «персональной информацией пользователя» понимаются:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Персональная информация, которую пользователь предоставляет о себе самостоятельно при 
                заполнении форм обратной связи, включая персональные данные пользователя (имя, email, телефон).
              </li>
              <li>
                Данные, которые автоматически передаются в процессе использования сайта с помощью установленного 
                на устройстве пользователя программного обеспечения (IP-адрес, информация из cookie, 
                информация о браузере).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Цели обработки персональной информации</h2>
            <p>
              Компания собирает и хранит только ту персональную информацию, которая необходима для 
              предоставления услуг:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Связь с пользователем для предоставления информации об услугах и программах обучения</li>
              <li>Подготовка коммерческих предложений</li>
              <li>Организация и проведение тренингов</li>
              <li>Улучшение качества услуг и сервиса</li>
              <li>Статистический анализ посещаемости сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Условия обработки персональной информации</h2>
            <p>
              Компания обрабатывает персональную информацию пользователя на следующих условиях:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обработка производится с согласия пользователя на обработку его персональной информации</li>
              <li>
                Обработка необходима для исполнения договора, стороной которого является пользователь
              </li>
              <li>
                Обработка персональных данных осуществляется с соблюдением принципов и правил, 
                предусмотренных Федеральным законом от 27.07.2006 N 152-ФЗ «О персональных данных»
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Защита персональной информации</h2>
            <p>
              Компания принимает необходимые и достаточные организационные и технические меры для защиты 
              персональной информации пользователя от неправомерного или случайного доступа, уничтожения, 
              изменения, блокирования, копирования, распространения, а также от иных неправомерных действий 
              с ней третьих лиц.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Изменение Политики конфиденциальности</h2>
            <p>
              Компания имеет право вносить изменения в настоящую Политику конфиденциальности. 
              При внесении изменений в актуальной редакции указывается дата последнего обновления. 
              Новая редакция Политики вступает в силу с момента ее размещения на сайте.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Обратная связь</h2>
            <p>
              Все предложения или вопросы по поводу настоящей Политики следует направлять по адресу:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="font-semibold">B2B Sales</p>
              <p>Email: <a href="mailto:email@btbsales.ru" className="text-primary hover:underline">email@btbsales.ru</a></p>
              <p>Телефон: <a href="tel:+79267318859" className="text-primary hover:underline">+7 926 731 88 59</a></p>
              <p>Сайт: <a href="https://www.btbsales.ru" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.btbsales.ru</a></p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>Дата последнего обновления: 18 ноября 2024 года</p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">B2B Sales</div>
              <p className="text-gray-400">Нейросети для B2B-продаж</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p>
                  Телефон: <a href="tel:+79267318859" className="hover:text-white transition-colors">+7 926 731 88 59</a>
                </p>
                <p>
                  Email: <a href="mailto:email@btbsales.ru" className="hover:text-white transition-colors">email@btbsales.ru</a>
                </p>
                <p>
                  Сайт: <a href="https://www.btbsales.ru" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.btbsales.ru</a>
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ссылки</h4>
              <div className="space-y-2">
                <a href="https://btbsales.ru/trainings/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">Программы обучения B2B продажам</a>
                <a href="https://btbsales.ru/stati/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">Статьи о продажах</a>
                <a href="https://vkvideo.ru/playlist/-228629411_2" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">Видео о продажах</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 B2B Sales. Все права защищены. <a href="/privacy" className="hover:text-white transition-colors underline">Политика конфиденциальности</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
