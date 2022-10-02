---
id: 205
title: 'Getting started with BDD IntelliJ'
pubDate: '2015-01-17T16:33:28+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=205'
permalink: /2015/01/getting-started-with-bdd-intellij/
interface_sidebarlayout:
    - default
categories:
    - Automation
    - Programming
tags:
    - bdd
    - cucumber
    - java
    - junit
---

Here is a quick step-by-step example of how to get started with BDD in IntelliJ. You can also follow these examples if you are using other IDEs, but some of the automatic good stuff may not happen (like auto-downloading plugins to help you edit the feature files and prompting you to import new Mavan dependencies).

- The quick version for IntelliJ
- The quick version for Eclipse

I tried a couple of BDD frameworks in Java before settling with Cucumber-JVM, which integrated really well.

Here are the steps to follow to get going – the second project you use BDD with will be much easier as many of these steps don’t need to be repeated.

### New Project

Open IntelliJ and select “New Project”. To get started quickly, use the Maven archetype org.apache.maven.archetypes:maven-archetype-quickstart. This will start your project with a reasonable structure and will help you to follow this example.

![New IntelliJ Project](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/intellij-new-project.jpg)

Enter some details for the GroupId (I have entered “com.example”) and ArtifactId (I have entered “example”.

![New IntelliJ Project Part 2](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/intellij-new-project-2.jpg)

Click next. The next screen should be pre-completed, so just click next again. If you don’t have a path in the Maven path, you will get an error – [download Maven](http://maven.apache.org/download.cgi) if you haven’t already and then supply the path to the location you unzipped Maven to.

![New IntelliJ Project - Part 3](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/intellij-new-project-3.jpg)

I have entered the project name “Example” and allowed IntelliJ to select the project location for me.

You will now have a new almost-empty solution with a neat structure.

### External Libraries

The external libraries in use are listed below. Don’t worry too much about the version numbers, these were the latest stable versions at the time.

- info.cukes:cucumber-java:1.1.3
- info.cukes:cucumber-junit:1.1.3
- junit:junit:4.11

To download everything you need automatically, open your “pom.xml” file and add the Cuckes repository, and all the dependencies in the below code snippet:

```
<pre class="prettyprint lang-xml"><repositories>
    <repository>
      <id>sonatype-snapshots</id>
      <url>https://oss.sonatype.org/content/repositories/snapshots</url>
      <snapshots>
        <enabled>true</enabled>
      </snapshots>
    </repository>
</repositories>
```

```
<pre class="prettyprint lang-xml"><dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>info.cukes</groupId>
      <artifactId>cucumber-junit</artifactId>
      <version>1.1.3</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>info.cukes</groupId>
      <artifactId>cucumber-java</artifactId>
      <version>1.1.3</version>
      <scope>test</scope>
    </dependency>
</dependencies>
```

Maven will happily add all your external dependencies and you may see more than you asked for, because it will automatically grap any additional dependencies that the packages need.

### Quick Clean Up

The quick start archetype will have added an App.java and AppTest.java file. Delete those – as we’ll be writing our program from scratch.

You should now have a clean project structure like the image below, with just the folder structure for the program and tests and the “pom.xml” file and external libraries.

![Clean Solution](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/intellij-quickstart-clean-solution.jpg)

### Cukes Runner

Now that the basic project and its dependencies are set up, there is a little wiring to perform to join up your specifications to your test runner. You can do this using a single empty class with a couple of attributes.

```
<pre class="prettyprint lang-java">import cucumber.api.junit.*;
import org.junit.runner.RunWith;
@RunWith(Cucumber.class)
@Cucumber.Options(
    features={"src/test/resources"}
)
public class CukesRunner {}
```

This wires up Cucumber to JUnit and tells it to find the feature files in the “src/test/resources” folder.

### Cucumber for Java Plugin

To get the best out of IntelliJ when working with Cucumber, download the Cucumber for Java plugin. You can do this by opening “File” &gt; “Settings” and searching for “Cucumber” in the plugins search box.

![Cucumber for Java](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/intellij-cucumber-for-java.jpg)

### Features

When we created the Cukes Runner, we told it to find features in the “src/test/resources” folder, so we need to add a new folder under “test” named “resources”. Once the folder is added, right-click and find “Mark Directory As” in the menu, then select “Test Resources Root” from the options.

You can now add a new feature to this folder. Add a new text file named “Example.feature”. IntelliJ will prompt you to download plugins when you add this file – so accept the plugins. They will make it easier to work with the Gherkin syntax in your feature files.

In your new feature file, add the following specification:

```
Feature: Fizz Buzz Game

    So that plays can be validated

    As a Fizz Buzz umpire

    I want to enter a play and see the correct answer
```

```
Scenario: Get answers based on played numbers

    Given I am officiating a FizzBuzz game

    When the number 1 is played

    Then I should be told the correct answer is "1"
```

Now right-click on CukesRunner and select “Run ‘CukesRunner'”. Cucumber will output the following useful message:

```
<pre class="prettyprint lang-java">You can implement missing steps with the snippets below:
@Given("^I am officiating a FizzBuzz game$")
public void I_am_officiating_a_FizzBuzz_game() throws Throwable {
    // Express the Regexp above with the code you wish you had
    throw new PendingException();
}
@When("^the number (\\d+) is played$")
public void the_number_is_played(int arg1) throws Throwable {
    // Express the Regexp above with the code you wish you had
    throw new PendingException();
}
@Then("^I should be told the correct answer is \"([^\"]*)\"$")
public void I_should_be_told_the_correct_answer_is(String arg1) throws Throwable {
    // Express the Regexp above with the code you wish you had
    throw new PendingException();
}
```

Simply add this suggested code to a new Java class called “ExampleSteps”. IntelliJ will prompt you to add the following import statements:

```
<pre class="prettyprint lang-java">import cucumber.api.PendingException;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
```

If you run the tests again, you’ll see that the output has changed to show the tests are ignored, because there is no implementation for the tests yet.

### Complete Example

Project Structure

![Final Solution](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/intellij-final-solution.jpg)

CukesRunner.java

```
<pre class="prettyprint lang-java">package com.example;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;
@RunWith(Cucumber.class)
@Cucumber.Options(
        features={"src/test/resources"}
)
public class CukesRunner {}
```

Example.feature

```
<pre class="prettyprint lang-gherkin">Feature: Fizz Buzz Game
  So that plays can be validated
  As a Fizz Buzz umpire
  I want to enter a play and see the correct answer

Scenario: Get answers based on played numbers
    Given I am officiating a FizzBuzz game
    When the number 1 is played
    Then I should be told the correct answer is "1"
```

ExampleSteps.java

```
<pre class="prettyprint lang-java">package com.example;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import static org.junit.Assert.assertEquals;

public class ExampleSteps {
    private Example _target;
    private String _actualResult;
    @Given("^I am officiating a FizzBuzz game$")
    public void I_am_officiating_a_FizzBuzz_game() {
        _target = new Example();
    }
    @When("^the number (\\d+) is played$")
    public void the_number_is_played(int playedNumber) {
        _actualResult = _target.checkPlay(playedNumber);
    }
    @Then("^I should be told the correct answer is \"([^\"]*)\"$")
    public void I_should_be_told_the_correct_answer_is(String expectedResult) {
        assertEquals(expectedResult, _actualResult);
    }
}
```

Example.java

```
<pre class="prettyprint lang-java">package com.example;
public class Example {
    public String checkPlay(int playedNumber) {
        return Integer.toString(playedNumber);
    }
}
```

Test Results

![Test Results](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/intellij-test-results.jpg)

### GitHub

You can see a more complete example on my [Java Katas repository on GitHub](https://github.com/Steve-Fenton/JavaKatas/tree/master/NumberGames).

### IntelliJ Users Summary

Here is the summary for IntelliJ users…

1. New Project 
    - Maven 
        - org.apache.maven.archetypes:maven-archetype-quickstart
2. Add the pom.xml repository and dependencies listed in the example above
3. Add source folder, “src/test/resources”
4. Delete the App.java and AppTests.java files
5. Add the CukesRunner class in the example above
6. Settings -&gt; Plugins -&gt; Search for “Cucumber for Java” and install
7. Add the feature file and step class from the example above

### Eclipse Users Summary

All of the above steps are roughly translatable to Eclipse. I used Eclipse Luna to recreate this project and the following steps are a guide to what I changed…

1. File -&gt; New -&gt; Project 
    - Maven -&gt; Maven Project 
        - Select “maven-archetype-quickstart”
2. Add the pom.xml repository and dependencies listed in the IntelliJ example above
3. Add source folder, “src/test/resources”
4. Delete the App.java and AppTests.java files
5. Add the CukesRunner class in the example above
6. Help -&gt; Install New Software 
    - Enter the following URL into the “Work with” field: http://cucumber.github.com/cucumber-eclipse/update-site
7. Add the feature file and step class from the example above