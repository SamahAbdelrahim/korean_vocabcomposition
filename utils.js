function test1() {
    console.log('test1')
}

function logExpData(data) {
    console.log("utils data")
    console.log(data)
    console.log("data.session_id");
    console.log(data.session_id);
    const logData = {
        rt: data.rt,
        trial_type: data.trial_type,
        trial_index: data.trial_index,
        time_elapsed: data.time_elapsed,
        internal_node_id: parseFloat(data.internal_node_id),
        subject: data.subject_id,
        response: JSON.stringify(data.response),
        theword: data.theword,
        block: data.theblock,
        study_id: data.study_id,
        session_id: data.session_id,
    };

    // Use relative path instead of hardcoded domain
    return fetch('/api/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => console.log('Log success:', data))
    .catch(error => {
        console.error('Error logging action:', error);
        // Optionally retry or handle the error more gracefully
    });
}