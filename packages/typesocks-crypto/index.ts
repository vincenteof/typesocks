import { Socket, connect } from 'net'

const PASSWORD_LENGTH = 256

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export function randomPassword() {
  const arr = []
  for (let i = 0; i < PASSWORD_LENGTH; i++) {
    let byte = getRandomInt(0, PASSWORD_LENGTH)
    while (byte === i) {
      byte = getRandomInt(0, PASSWORD_LENGTH)
    }
    arr[i] = byte
  }
  return Buffer.from(arr)
}

export class Cipher {
  private encodePassword: Buffer
  private decodePassword: Buffer

  constructor(password: Buffer) {
    this.encodePassword = password
    const decodePassword = []
    for (let i = 0; i < PASSWORD_LENGTH; i++) {
      decodePassword[this.encodePassword[i]] = i
    }
    this.decodePassword = Buffer.from(decodePassword)
  }

  encode(bf: Buffer) {
    for (let i = 0; i < bf.length; i++) {
      bf[i] = this.encodePassword[bf[i]]
    }
  }

  decode(bf: Buffer) {
    for (let i = 0; i < bf.length; i++) {
      bf[i] = this.decodePassword[bf[i]]
    }
  }
}
