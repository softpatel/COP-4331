package studyapptests;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class StudyAppTimerTest 
{
    public static void main(String[] args) throws InterruptedException
    {
        //System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe");
        System.setProperty("webdriver.gecko.driver", "C:\\geckodriver-v0.22.0-win64\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.get("https://warm-eyrie-11186.herokuapp.com/");
        
        WebElement link;
        link = driver.findElement(By.linkText("Timer"));
        link.click();
        Thread.sleep(2000);
        
        WebElement startTimer;
        WebElement stopTimer;
        WebElement resetTimer;
        WebElement increaseTimer;
        WebElement decreaseTimer;
        
        startTimer = driver.findElement(By.xpath("//*[@id=\"start-session\"]"));
        startTimer.click();
        driver.switchTo().alert().accept();
        Thread.sleep(2000);
        
        stopTimer = driver.findElement(By.xpath("//*[@id=\"stop-session\"]"));
        stopTimer.click();
        Thread.sleep(2000);
        
        resetTimer = driver.findElement(By.xpath("//*[@id=\"reset-session\"]"));
        Thread.sleep(2000);
        
        increaseTimer = driver.findElement(By.xpath("//*[@id=\"increase-session\"]"));
        for(int i = 0; i < 3; i++)
            increaseTimer.click();
        Thread.sleep(2000);
        stopTimer.click();
        
        decreaseTimer = driver.findElement(By.xpath("//*[@id=\"decrease-session\"]"));
        for(int i = 0; i < 3; i++)
            decreaseTimer.click();
        Thread.sleep(2000);
        stopTimer.click();
        
        //driver.quit();
    }
}
