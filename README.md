
# Iron Lady: Smart Mentor Matchmaker

## Problem Identification
**Problem:** Manual Mentor-Learner matching in women's leadership programs is time-consuming, subjective, and difficult to scale. Operations managers at **Iron Lady** spend hours reading through lengthy bios and career goal statements to pair individuals, often missing subtle semantic alignments (e.g., matching a tech engineer's "pivot to product" goal with a mentor who actually performed that specific pivot).

## Proposed Workflow
1. **Operations Management:** Add/Update mentors and learners in the system (CRUD).
2. **Semantic Analysis:** For any unmatched learner, trigger the **AI Matchmaker**.
3. **AI Logic:** The system sends the learner's specific profile (goals, current role, challenges) and the entire pool of available mentors to the Gemini API.
4. **Intelligent Scoring:** Gemini returns a compatibility score and a human-readable "reasoning" for the match.
5. **Human-in-the-loop:** The operations manager reviews the top 3 suggestions and "Confirms" the match, updating the database state.

## Key Features
- **Role-Based Access:** Basic Admin/Ops login simulation.
- **Mentor CRM:** Complete CRUD operations for the mentor database.
- **Learner Tracking:** Complete CRM for enrollments with status tracking.
- **AI Matching Engine:** Powered by Gemini-3-Flash for deep semantic career path analysis.
- **Operations Dashboard:** Analytics for matching ratios and pending queues.

## 2-3 Minute Video Demo Script

### **[0:00 - 0:30] Problem Statement**
*(Visual: Start on the Login Screen, then move to the Dashboard)*
"Hi, I’m the Product Lead at Iron Lady. Our mission is to empower women through leadership training. But as we scaled, our biggest bottleneck became the **Matching Phase**. Manually pairing hundreds of learners with the right mentors based on nuanced career goals was taking our team over 40 hours per cohort. It was slow, subjective, and limited our growth. Today, I'll show you how we solved this with AI automation."

### **[0:30 - 1:30] App Walkthrough (CRUD)**
*(Visual: Navigate to 'Mentor CRM')*
"This is our Internal Ops Portal. Here in the **Mentor CRM**, we manage our global network of experts. We have full CRUD capabilities—adding new leaders, updating their expertise as they grow, or removing profiles.
*(Visual: Switch to 'Learner CRM')*
Next, the **Learner CRM** tracks our enrollments. Let's look at Priya, a Senior Software Engineer. Her profile details her specific struggle: pivoting from coding to stakeholder management. Notice her status is currently 'Needs Match'. Our dashboard keeps us accountable by showing exactly how many women are still waiting for a mentor."

### **[1:30 - 2:30] AI Feature Demo**
*(Visual: Navigate to 'AI Matchmaker' and select Priya)*
"Now for the core innovation: the **AI Matchmaker**. I’ll select Priya. When I click 'Generate Matches', we send her unique career trajectory and challenges to the Gemini API.
*(Visual: Click the button, wait for the AI result cards to appear)*
Gemini doesn't just do a keyword search. It performs a **semantic analysis**. Look at the top result: Sarah Jenkins, with a 95% match. The AI provides a specific rationale, noting that Sarah's past transition from technical VP to Consultant perfectly mirrors the pivot Priya wants to make. 
*(Visual: Click 'Confirm Match')*
I'll confirm the match. In seconds, we've made a high-quality, data-driven pairing that would have taken an operations manager 20 minutes of research. This is how Iron Lady scales mentorship with intelligence."

### **[2:30 - 3:00] Conclusion**
"By integrating Gemini into our internal workflow, we've reduced manual matching time by 90% while ensuring our learners get the most compatible mentors possible. Better matches mean better careers. Thank you!"
