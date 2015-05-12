Psychology of Music Spring 2015 final project
=============================================

[Website](http://conundrumer.com/musicpsych)

Explanation for lateness
------------------------
So it turns out that writing a webapp instead of a paper may have been poor judgment. I know how to write webapps, and I'm good at coding, but I wouldn't call myself an expert at making webapps really really fast. **Webapps are not trivial!** I can make them decently fast; this project that was three days of ([continuous](https://github.com/conundrumer/musicpsych/graphs/punch-card)) work (+an initial overhead of recovering from the previous project I was working on and researching research methods and frameworks/libraries) for me would be acceptable as a final project for the course Web Application Development. I probably should have asked for more of an extension. I hope you understand my circumstance. So I present to you a minimal viable product/proof of concept. It's not very refined. I'm using Bootstrap's default theme. It could use a lot of improvements on the design. But I hope the user experience isn't too terrible, keeping in mind your request for a decent UX.

Introduction
------------
This project is a framework for online music psychology studies. This was heavily based on this study
<sup>[1](#singlechords)</sup> where the study was done online through the web browser. This framework provides three functionalities: [Experiment creation](http://conundrumer.com/musicpsych/#/new), [experiment hosting](http://conundrumer.com/musicpsych/#/experiment/example), and [analysis](http://conundrumer.com/musicpsych/#/results/random triads 1). Researchers can create music experiments that survey the participant and survey participants' responses to selected stimuli (currently needs to be hardcoded). Participants can evaluate an arbitrary number of stimuli and choose to complete the participant survey. Analysts can view the results of experiments, currently in rudimentary tabular form, but eventually through data visualization.

Motivation
----------
There are a number of studies<sup>[1](#singlechords)</sup> <sup>[2](#harmonicintervals)</sup><sup>[3](#ratingintervals)</sup> <sup>[4](#melodicintervals)</sup> of varying results on the rudiments of music. I wanted to continue exploring intervals and chords, and extend them to microtones, but in order to get meaningful data for an expanded set of variables, I would have to get a large number of participants. The most practical way is to get them through the internet, and, since mapping music intervals and chords to words is a generally weak mapping, I'd have to experiment with what dimensions would work best, while keeping the numbers low, so it would make sense to have a framework to do all of that.

Unipolar and Bipolar Scales
---------------------------
I created these scales to be continuous due to a study<sup>[6](#continuousscales)</sup> arguing that continuous scales tend to have less noise, and also due to the personal observations of friends using decimal places to rate things and the personal observation of me choosing values in between integers. These scales are actually a compromise between the continuous scale and the Likert scale, since I also found it beneficial to have reference points on the scale that have semantic meaning that is a little more concrete than numbers. This was also how I was able to manipulate the linearity of the scale by stretching out the qualities of smallness since musical rudiments tend rarely to produce strong reactions.

Multiple Instruments
--------------------
I allowed the option of having multiple instruments due to this study<sup>[1](#singlechords)</sup> demonstrating the importance of timbre in the perception of emotion in chords. I figured that allowing the participant to listen to the musical element with a variety of instruments would reduce the effects of timbre and would allow them to evaluate the element purely based on the musical qualities.

Survey Structure
----------------
The surveys begin with the music element evaluation, where the participant can evaluate an arbitrary number before going into the optional demographic/participant survey. I designed it to be this way because, from personal experience of completing online surveys, I found that personal questions are generally discouraging, and I want to optimize participation. In addition, studies<sup>[1](#singlechords)</sup><sup>[2](#harmonicintervals)</sup> show that demographic variations are not a large factor in the perception of musical elements, so it's not a big loss to not have personal information. Finally, this would allow participants to remain completely anonymous. In certain cases, there is some procedure and restrictions regarding collection of personal data for research<sup>[6](#onlineresearch)</sup>.

Planned Features
----------------
- Data visualization
- Custom scripted stimuli and instruments
- Better UI design
- Authentication/permissions for experiment creation
- Experiment editing
- An independent backend
- Form data validation in the backend
- ...whatever else you would like to suggest

Sources
-------
<a name="singlechords">1</a>: [Single chords convey distinct emotional qualities to both naïve and expert listeners](http://pom.sagepub.com/content/early/2014/10/14/0305735614552006.abstract)

<a name="harmonicintervals">2</a>: [Psychological Connotations of Harmonic Musical Intervals](http://pom.sagepub.com/content/28/1/4.abstract)

<a name="ratingintervals">3</a>: [Subjective Reactions to Musical Intervals Assessed by Rating Scales](http://www.icmpc8.umn.edu/proceedings/ICMPC8/PDF/AUTHOR/MP040023.PDF)

<a name="melodicintervals">4</a>: [Verbal and Exploratory Responses to Melodic Musical Intervals](http://geaudio.com/Skole/Semesteroppgave%20Musikkpsykologi/Verbal%20and%20exploratory%20responses%20to%20melodic%20musical%20intervals.pdf)

<a name="continuousscales">5</a>: [Benefits from using continuous rating scales in online survey research](http://www.statistik.tuwien.ac.at/forschung/SM/SM-2009-4complete.pdf)

<a name="onlineresearch">6</a>: [Psychological Research Online: Opportunities and Challenges](http://www.apa.org/science/leadership/bsa/internet/internet-report.pdf)
