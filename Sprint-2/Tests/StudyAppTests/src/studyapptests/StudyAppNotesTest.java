package studyapptests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class StudyAppNotesTest
{
    public static void main(String[] args) throws InterruptedException
    {
        System.setProperty("webdriver.gecko.driver", "<enter the location of geckodriver.exe here>");
        WebDriver driver = new FirefoxDriver();
        driver.get("https://warm-eyrie-11186.herokuapp.com/");
        
        WebElement link = driver.findElement(By.xpath("/html/body/a[4]"));
        link.click();
        Thread.sleep(2000);
        
        WebElement note = driver.findElement(By.xpath("/html"));
        note.sendKeys("test note");
        Thread.sleep(2000);
        
        WebElement save = driver.findElement(By.xpath("//*[@id=\"donebtn\"]"));
        save.click();
        
        WebElement user;
        user = driver.findElement(By.xpath("/html/body/form/input[1]"));
        user.sendKeys("user");
        WebElement pass = driver.findElement(By.xpath("/html/body/form/input[2]"));
        pass.sendKeys("pass");
        Thread.sleep(2000);
        link = driver.findElement(By.xpath("/html/body/form/input[3]"));
        link.click();
    }
}
