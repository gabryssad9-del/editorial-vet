import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VETMED Olsztyn',
    short_name: 'VETMED',
    description: 'Profesjonalna opieka weterynaryjna w Olsztynie',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FE4520',
    icons: [
      {
        src: '/emotional-vet/vetmed1.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
