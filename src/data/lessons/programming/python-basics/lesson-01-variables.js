export default {
  id: "lesson-01-variables",
  title: "Variables in Python",
  content: "# Variables\n\nA variable stores data in Python. Think of it as a container that holds information you can use later in your program.\n\n## What are Variables?\n\nVariables are named storage locations in computer memory. You can store different types of data in variables:\n\n- Text (strings)\n- Numbers (integers, floats)\n- Boolean values (True/False)\n- And much more!\n\n## Creating Variables\n\nIn Python, you create a variable by giving it a name and assigning a value using the equals sign (=).\n\n## Example\n\n```python\nname = 'Alice'\nage = 10\nheight = 4.5\nis_student = True\n\nprint(name)        # Output: Alice\nprint(age)         # Output: 10\nprint(height)      # Output: 4.5\nprint(is_student)  # Output: True\n```\n\n## Variable Naming Rules\n\nWhen naming variables in Python, follow these rules:\n\n1. Variable names must start with a letter or underscore\n2. Variable names cannot start with a number\n3. Variable names can only contain letters, numbers, and underscores\n4. Variable names are case-sensitive (name, Name, and NAME are different)\n5. Variable names cannot be Python keywords\n\n## Good Variable Names\n\n```python\n# Good variable names\ncar_name = 'Toyota'\nstudent_age = 15\nmax_score = 100\nis_logged_in = True\n\n# Bad variable names (avoid these)\nc = 'Toyota'         # Not descriptive\n2name = 'John'       # Starts with number\nmy-var = 10          # Contains hyphen\nclass = 'Math'       # Python keyword\n```\n\n## Data Types\n\nPython automatically determines the data type of a variable:\n\n```python\n# String (text)\nname = 'Python'\n\n# Integer (whole numbers)\nversion = 3\n\n# Float (decimal numbers)\nprice = 29.99\n\n# Boolean (True/False)\nis_awesome = True\n```\n\n## Summary\n\nVariables can store text, numbers, and more. They are essential building blocks in programming that allow you to store and manipulate data in your programs.",
  xp: 50,
  quiz: {
    questions: [
      { 
        id: "q1", 
        type: "multiple_choice", 
        question: "What stores data in Python?", 
        options: ["Variable", "Function", "Loop", "Class"], 
        correct: 0 
      },
      { 
        id: "q2", 
        type: "true_false", 
        question: "Python is case-sensitive when it comes to variable names.", 
        correct: true 
      },
      { 
        id: "q3", 
        type: "fill_blank", 
        question: "Complete the code: name ___ 'Alice'", 
        correct: "=" 
      }
    ]
  }
};
