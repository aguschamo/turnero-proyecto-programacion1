function Avatar({ nombre, photo, size = '', className = '' }) {
  const cls = ['hn-avatar', size ? `hn-avatar-${size}` : '', className].filter(Boolean).join(' ')
  const altText = nombre ? `Foto de perfil de ${nombre}` : 'Foto de perfil'

  if (photo) {
    return <img src={photo} alt={altText} className={`${cls} object-fit-cover`} />
  }

  const inicial = (nombre || '').trim().charAt(0) || '?'
  return <span className={cls} aria-label={altText}>{inicial.toUpperCase()}</span>
}

export default Avatar