package studyapptests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class StudyAppSignUpTest 
{
    public static void main(String[] args) throws InterruptedException
    {
        //System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe");
        System.setProperty("webdriver.gecko.driver", "C:\\geckodriver-v0.22.0-win64\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.get("https://warm-eyrie-11186.herokuapp.com/");
        WebElement link;
        link = driver.findElement(By.xpath("/html/body/a[1]"));
        link.click();
        Thread.sleep(5000);
        WebElement user = driver.findElement(By.xpath("/html/body/form/input[1]"));
        user.sendKeys("user");
        WebElement pass = driver.findElement(By.xpath("/html/body/form/input[2]"));
        pass.sendKeys("pass");
        link = driver.findElement(By.xpath("/html/body/form/button"));
        link.click();
        //driver.quit();
    }
}
