export const formData = Array.from({ length: 15 }, (_, index) => {
    const applicationsNumber = 12
    const isActive = Math.random() < 0.5; // 50% olasılıkla true veya false

    return {
        id: String(index + 1),
        name: `Form${index + 1}`,
        description: "Id aliqua culpa non amet aute magna laborum irure.",
        applicationsNumber,
        isActive,
        questions: Array.from({ length: Math.floor(Math.random() * 7) + 4 }, () => {
            const type = Math.floor(Math.random() * 8); // 0 ile 7 arasında rastgele bir tamsayı
            const question = "What is your name?";
            const isRequired = true;
            const options = type === 5 ? ["Option 1", "Option 2", "Option 3", "Option 4"] : [];
            return { type, question, isRequired, options };
        })
    };
});


export const applicationData = Array.from({length: formData.length * 12}, (_, index) => {
    return {
        id: String(index + 1),
        formId: String((index % 12) + 1),
        answers: Array.from({length: formData[index % 12].questions.length}, (_, index) => {
            if (formData[index % 12].questions[index].type == 5) {
                formData[index % 12].questions[index].options[Math.floor(Math.random() * 3)];
            }
            else {
                "Answer" + String(index);
            }
        }),
    }
});