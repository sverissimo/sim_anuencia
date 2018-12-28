const randomColor = () => {

  const array = [ 'rgb(120, 150, 151)', 'rgb(104, 119, 133)', 'rgb(84, 104, 102)',
    'rgb(105, 117, 153)', 'rgb(88, 103, 88)', 'rgb(117, 116, 101)', 
    'rgb(89, 121, 120)', 'rgb(117, 117, 137)' ]
  let color = array[Math.floor(Math.random() * array.length)]
  return color
}

export default randomColor

/* const letters = '3456789';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 7)];
  }
  return color; */