function calculateAge() {
  const birthdate = document.getElementById("birthdate").value;
  if (!birthdate) {
    document.getElementById("result").innerText =
      "Please enter a valid birthdate.";
    return;
  }

  const birthDate = new Date(birthdate);
  const today = new Date();

  // Calculate total milliseconds of age
  const ageInMs = today - birthDate;

  // Convert to various units
  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;
  const msInMonth = msInDay * 30.436875; // Average days in a month
  const msInYear = msInDay * 365.25; // Account for leap years

  // Calculate years
  const years = Math.floor(ageInMs / msInYear);

  // Calculate months (more accurate method)
  let months = today.getMonth() - birthDate.getMonth();
  if (months < 0) months += 12;

  // Adjust month if the day of month is earlier
  if (today.getDate() < birthDate.getDate()) {
    months = (months - 1 + 12) % 12;
  }

  // Calculate days
  const monthWithSameDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    birthDate.getDate()
  );
  let days;

  if (today.getDate() >= birthDate.getDate()) {
    // Easy case: we're already past the birth day in this month
    days = today.getDate() - birthDate.getDate();
  } else {
    // We need to count days from the last month
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days = lastMonth.getDate() - birthDate.getDate() + today.getDate();
  }

  // Calculate hours, minutes, seconds
  let hours = today.getHours() - birthDate.getHours();
  if (hours < 0) {
    hours += 24;
    days--;
  }

  let minutes = today.getMinutes() - birthDate.getMinutes();
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  let seconds = today.getSeconds() - birthDate.getSeconds();
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  // Handle any potential negative values after adjustments
  if (days < 0) {
    // Recalculate months and days
    months--;
    if (months < 0) months += 12;

    // Get days in the previous month
    const daysInPrevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += daysInPrevMonth;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  // Create result message
  let resultText = `You are ${years} years, ${months} months, and ${days} days old.`;
  resultText += `\nPlus ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;

  // Calculate total values for additional information
  const totalDays = Math.floor(ageInMs / msInDay);
  const totalHours = Math.floor(ageInMs / msInHour);
  const totalMinutes = Math.floor(ageInMs / msInMinute);
  const totalSeconds = Math.floor(ageInMs / msInSecond);

  resultText += `\n\nIn total, that's:`;
  resultText += `\n${totalDays.toLocaleString()} days`;
  resultText += `\n${totalHours.toLocaleString()} hours`;
  resultText += `\n${totalMinutes.toLocaleString()} minutes`;
  resultText += `\n${totalSeconds.toLocaleString()} seconds`;

  document.getElementById("result").innerText = resultText;
}

// For real-time seconds update
function startRealTimeAgeCounting() {
  calculateAge();
  setInterval(calculateAge, 1000); // Update every second
}
