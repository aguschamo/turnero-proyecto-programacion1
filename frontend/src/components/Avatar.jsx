function Avatar({ nombre, photo, size = '', className = '' }) {
  const cls = ['hn-avatar', size ? `hn-avatar-${size}` : '', className].filter(Boolean).join(' ')

  if (photo) {
    return <img src={photo} alt="Foto de perfil" className={`${cls} object-fit-cover`} />
  }

  const inicial = (nombre || '').trim().charAt(0) || '?'
  return <span className={cls}>{inicial.toUpperCase()}</span>
}

export default Avatar