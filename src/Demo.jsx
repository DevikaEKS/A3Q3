import React, { useState, useRef } from 'react';
import './Demo.css';

function Demo() {
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const printRef = useRef();
  const addSkill = () => {
    const newSkill = skillInput.trim();
    if (newSkill !== '' && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // refresh to reset
    }, 500);
  };

  const handleDownload = () => {
    const profileData = {
      name: "Jack",
      email: "jackdaniel45@gmail.com",
      location: "Mumbai",
      phone: "8989787878",
      skills: skills,
    };

    const jsonBlob = new Blob([JSON.stringify(profileData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "profile_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`skillset-theme-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="header-section">
        <h2 className="page-title">Profile Skillset</h2>
        {!showSkillInput ? (
          <button className="add-skill-btn" onClick={() => setShowSkillInput(true)}>
            + Add Skill
          </button>
        ) : (
          <div className="input-skill-wrapper">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Enter a skill"
              className="skill-input"
            />
            <button className="confirm-add-btn" onClick={addSkill}>Add Skill</button>
          </div>
        )}
         <button className="add-skill-btn toggle-theme-btn" onClick={toggleTheme}>
  {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
</button>
      </div>

      <div className="main-layout">
        {/* Actual Profile Card */}
        <div className="profile-card">
          <div className='flexarea'>
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="profile-img"
            />
            <div>
              <h3 className="profile-name">Jack</h3>
              <p>Email: jackdaniel45@gmail.com</p>
              <p>Location: Mumbai</p>
              <p>Phone: 8989787878</p>
            </div>
          </div>
          <div className="skills-container">
            <h5 className="skills-heading">SKILLS</h5>
            <div className="skill-tags-container">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <span className="remove-tag" onClick={() => removeSkill(index)}>✕</span>
                </span>
              ))}
            </div>
            <button className="action-btn printbtn" onClick={handlePrint}>Print</button>
            <button className="action-btn savebtn" onClick={handleDownload}>Save</button>
          </div>
        </div>

        {/* Print Preview Area */}
        {showPreview && (
          <div className="preview-card preview-color" ref={printRef}>
            <h4>Print Preview</h4>
            <div className='flexarea'>
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="profile-img"
              />
              <div>
                <h3 className="profile-name">Jack</h3>
                <p>Email: jackdaniel45@gmail.com</p>
                <p>Location: Mumbai</p>
                <p>Phone: 8989787878</p>
              </div>
            </div>
            <div className="skills-container">
              <h5 className="skills-heading">SKILLS</h5>
              <div className="skill-tags-container">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
}

export default Demo;
