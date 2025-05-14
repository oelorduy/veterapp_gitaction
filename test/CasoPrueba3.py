#Caso de prueba 3 - Crear cita sin ingresar propietario
#En este caso se automitiza el ingreso de los campos mascota,
#email, fecha de cita formato AAAA-MM-DD igual o mayor al dia de hoy
#y el campo observaciones
#se crearon excepciones para errores inesperados en ejecucion de la prueba.
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException, UnexpectedAlertPresentException

# Crear opciones del navegador
options = Options()
options.add_argument("--start-maximized")

# Configurar el driver
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

try:
    # Abrir una url host:3000
    driver.get("http://localhost:3000/")
    time.sleep(2)
    #Ingresa nombre de mascota
    driver.find_element(By.ID, "mascota").send_keys("macarena")
    time.sleep(2)
    #Ingresa e-mail del propietario
    driver.find_element(By.ID, "email").send_keys("juanperez@gmail.com")
    time.sleep(2)
    #Ingresa fecha de la cita  
    driver.find_element(By.ID, "cita").send_keys("2025" + Keys.ARROW_RIGHT + "05-30")
    time.sleep(2)
    #Ingresa observaciones del paciente
    driver.find_element(By.ID, "observaciones").send_keys("colitis de 4 dias de evolucion")
    time.sleep(2)
    #Click al boton de agregar
    driver.find_element(By.ID, "agregar").click()
    time.sleep(3)

    # Manejar alerta
    try:
        driver.switch_to.alert.accept()
    except UnexpectedAlertPresentException:
        print("⚠️ Alerta inesperada presente.")

    # Mostrar mensaje visual
    script = """
    var mensaje = document.createElement('div');
    mensaje.innerText = 'Caso de prueba Tres Ejecutado con Éxito';
    mensaje.style.position = 'fixed';
    mensaje.style.bottom = '20px';
    mensaje.style.right = '20px';
    mensaje.style.background = '#4CAF50';
    mensaje.style.color = 'white';
    mensaje.style.padding = '10px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    mensaje.style.zIndex = 9999;
    document.body.appendChild(mensaje);
    """
    driver.execute_script(script)

except NoSuchElementException as e:
    print(f"❌ Elemento no encontrado: {e}")
except TimeoutException as e:
    print(f"⏰ Tiempo de espera agotado: {e}")
except Exception as e:
    print(f"⚠️ Error inesperado: {e}")

input("Presiona ENTER para cerrar el navegador...")
driver.quit()