---
title: 'On Maven and Gradle'
date: '2023-10-02'
---

When I first started with Java, I was impressed with how easy it was to work with libraries.
Having previously worked with C++, I was used to having to set up my include directories, then
the lib directories, then dll directories as well (on windows you need to link to .lib files)
just to use a library. In Java, all I had to do was to add a .jar file and be done with it.
There were some complications when having someone run it, but it was only a bit more difficult
compared to distributing the DLL files.

When I finally started with Android, it was already using Gradle. That simplified the deployment
as well, reducing my work to writing code and adding a single line to build.gradle at times.

This worked perfectly, and I scoffed at those that used Maven and their verbose xml. Things
started to change when I had to develop an SDK with embedded libraries. In those days, Gradle
updated on a very frequent basis, and with that it often introduced new ways of doing things,
while simultaneously breaking the old build. 

This meant my choice was either using an old version
of Android Studio, or spending more time on changing the build.gradle file to get the expected
result. The issue became more apparent when I started working with Java on backend again and
the releases became more frequent. About six years ago, when Java started to get releases twice
a year, it became very annoying when Gradle didn't support the new version out of the box.

Once I discovered that often there were issues raised when an early access build was released,
but Gradle (or rather Groovy, one of the dependencies) didn't support it until weeks, to more
than a month after release was becoming annoying, and I started to wonder if there was a better
way.

Having to work with Maven-based projects for work, I started to wonder, why didn't they use a
wrapper like Gradle? Simply having Maven installed was enough to build all projects, even those
that haven't been touched in years. I finally caved and tried Maven for my own projects, and 
lo and behold, it...just...worked. When a new Java version was released, I updated the JDK,
changed the version in pom.xml and it worked. No errors when building, no unsupported class
file version exceptions, nothing. XML was a lot more verbose, but there was another thing,
there was autocompletion! When I typed `<dependency>` IntelliJ could infer what I wanted and
generated groupId, artifactId and version fields, moved to artifactId, when I filled that in
(with help of autocomplete!) it jumped to groupId (which also showed a list to pick from) and
finally the version! In gradle the best I could hope for was either "compile" or "implementation"
name autocompletion, half the properties felt like I was typing them in plain notepad.
Furthermore, issues in XML showed up before running build, unlike in Gradle, where the file
looked fine, but ultimately failed to build with an obscure exception.

Now, whenever I have to work with Gradle, it feels painful, I can't remember the last time I
could run a build without getting that famous line from Gradle: "Deprecated Gradle features
were used in this build, making it incompatible with Gradle N+1." How many times did I have to
change the pom.xml because Maven updated in last 6 years? Not once. The only breaking change
we've seen was disabling http for repositories by default. 

This leads me to think, how is breaking builds acceptable? Why do I need to update the build
tool to use a more recent version of the language? Granted, these days Gradle has "workarounds",
but no such thing was required for Maven, ever. As long as Java is installed, and you have a
version of Maven released in last couple of years, you're able to just build the project.

This least me to think, I never had similar issues with Make, CMake and so on (for the little
I used them). How is it acceptable for build to break, when you changed nothing in the project?
Why does my project break with Gradle, when it never does with Maven?

This is why I pick Maven whenever possible. At least I'll be able to build the project in a
few years if needed, Gradle likely wouldn't work, even with wrapper (at least without downloading
an old JDK).